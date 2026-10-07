package com.hbk.service;

import com.hbk.domain.PostStatus;
import com.hbk.dto.MissingPostRequestDto;
import com.hbk.dto.MissingPostResponseDto;
import com.hbk.entity.Member;
import com.hbk.entity.MissingPost;
import com.hbk.repository.MemberRepository;
import com.hbk.repository.MissingPostRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service //스프링 빈으로 등록하여 비즈니스로직을 담당하는 클래스로 지정
@RequiredArgsConstructor // final이 붙은 필드를 매개변수로 하는 생성자
@Transactional(readOnly = true) //기본적으로 데이터 전용 트랜잭션 설정..
public class MissingPostService {
    // 게시글 DB 작업용 리파지토리
    private final MissingPostRepository missingPostRepository;
    private final MemberRepository memberRepository;

    //실종 신고글 작성(로그인 유저 정보 반영)
    // 실종 신고글 작성 (파일 및 로그인 유저 정보 반영)
    @Transactional
    public MissingPostResponseDto createPost(
            MissingPostRequestDto requestDto, MultipartFile file, String username){

        System.out.println("========== [서비스 계층 진입] ==========");
        System.out.println("전달받은 title: " + (requestDto != null ? requestDto.getTitle() : "requestDto가 NULL입니다"));
        System.out.println("전달받은 username: " + username);

        Member member = memberRepository.findByName(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 입니다"));

        MissingPost post = new MissingPost();
        post.setTitle(requestDto.getTitle());
        post.setContent(requestDto.getContent());
        post.setBreed(requestDto.getBreed());
        post.setGender(requestDto.getGender());
        post.setAge(requestDto.getAge());
        post.setWeight(requestDto.getWeight());
        post.setColor(requestDto.getColor());
        post.setRescueLocation(requestDto.getRescueLocation());
        post.setStatus(PostStatus.MISSING);
        post.setAuthor(member);
        post.setCreatedAt(LocalDateTime.now());

        if (file != null && !file.isEmpty()) {
            try {
                String projectPath = System.getProperty("user.dir") + "/uploads/";
                File uploadDir = new File(projectPath);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                String originalFilename = file.getOriginalFilename();
                String savedFileName = UUID.randomUUID().toString() + "_" + originalFilename;

                File saveFile = new File(projectPath, savedFileName);
                file.transferTo(saveFile);

                String fileUrl = "/uploads/" + savedFileName;
                post.setMediaUrls(List.of(fileUrl));
                System.out.println("파일 저장 완료 경로: " + fileUrl);
            } catch (IOException e) {
                throw new RuntimeException("파일 업로드에 실패했습니다.", e);
            }
        }

        MissingPost savePost = missingPostRepository.save(post);
        System.out.println("========== [DB 저장 완료 ID: " + savePost.getId() + "] ==========");
        return new MissingPostResponseDto(savePost);
    }




    //무한 스크롤 조회
    public List<MissingPostResponseDto> getPostByScroll(Long cursorId, int size){
        Pageable pageable = PageRequest.of(0, size);
        //0번째 페이지부터 시작해서, 지정한 개수(size)만큼 데이터를 가져와라"라는 뜻입니다.
        List<MissingPost> posts =
                missingPostRepository.findAllByCursor(cursorId, pageable);
/*
전달받은 cursorId를 기준으로 그보다 오래된 글들을
pageable에 설정된 개수만큼 데이터베이스에서
엔티티 리스트(List<MissingPost>)로 조회해 옵니다.
*/
        return posts.stream().map(MissingPostResponseDto::new)
                .collect(Collectors.toList());
/*
자바 스트림(Stream)을 사용하여 데이터베이스에서 가져온 엔티티 객체(MissingPost)들을
프론트엔드가 필요한 형태인 응답 DTO(MissingPostResponseDto)로 각각 변환
.collect(Collectors.toList())를 통해 변환된 DTO들을 다시
깔끔한 리스트(List) 형태로 묶어서 최종 반환*/
    }


    @Transactional
    public MissingPostResponseDto updatePost(Long id, MissingPostRequestDto requestDto, String username){
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        if(!post.getAuthor().getUsername().equals(username)){
            throw new SecurityException("수정권한이 없습니다");
        }

        // 수정 내용 반영
        post.setTitle(requestDto.getTitle());
        post.setContent(requestDto.getContent());
        post.setBreed(requestDto.getBreed());
        post.setGender(requestDto.getGender());
        post.setAge(requestDto.getAge());
        post.setWeight(requestDto.getWeight());
        post.setColor(requestDto.getColor());
        post.setRescueLocation(requestDto.getRescueLocation());

        // 💡 mediaUrls는 값이 비어있지 않을 때만 변경하도록 방어 코드를 넣거나,
        // 폼에서 넘어올 때 유의해야 합니다. 일단 전달받은 값이 있으면 세팅합니다.
        if (requestDto.getMediaUrls() != null && !requestDto.getMediaUrls().isEmpty()) {
            post.setMediaUrls(requestDto.getMediaUrls());
        }

        // ❌ post.setCreatedAt(LocalDateTime.now()); 삭제 완료!

        return new MissingPostResponseDto(post);
    }

    //글삭제 본인확인
    @Transactional//데이터의 삭제 변경이 일어나끼 때문에 트랜잭션 적용
    public void deletePost(Long id, String username){
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("해당 게시글이 없습니다  id=" +id));
//권한이 없는 사람이 삭제 시도
        if(!post.getAuthor().getUsername().equals(username)){
            throw new SecurityException("삭제 권한이 없습니다");
        }

        missingPostRepository.delete(post);
//본인 확인 검증이 모두 끝나면,
// 리파지토리의 delete 메서드를 호출해 데이터베이스에서 해당 게시글 엔티티를 삭제합니다.
    }

    //⑤ 완료 처리 (찾았을 경우 상태 변경)
    @Transactional
    public void completPost(Long id, String username){
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다 id="+id));

        if(!post.getAuthor().getUsername().equals(username)){
            throw new SecurityException("권한이 없습니다");
        }
        post.setStatus(PostStatus.COMPLETED);
    }

}
/*
스프링에서 콩이란?
Spring Bean : 스프링 컨테이너가 직접 만들고 관리하는 자바 객체
자바에서 객체를 만들때 new 키워드로 직접 객체를 생성하고 소멸시키는 것과 달리
스프링이(IoC 컨테이너)가 그 객체들의 생명주기(생성, 의존성 연결,소멸)을
대신 관리

스프링빈의 핵심 특징
- 제어의 역전 : 객체의 제어권이 개발자가 아니라 스프링 컨테이너
- 싱글톤(Singleton) 기본 제공 : 특별한 설정이 없다면 스프링은 빈을
단 하나만 생성(싱글톤)하여 전파하고 재사용합니다. 메모리 낭비
- 의존성 주입(DI): 빈과 빈 사이에 필요한 의존 관계를 스프링이 자동으로 연결해 줍니다

자동 등록(@Component) vs 수동 등록(@Bean)
두 방식은 객체를 스프링 빈으로 등록한다는 목적은 같지만,
어디에 사용하고 어떻게 관리하느냐에서 큰 차이가 있습니다.

자동 등록 (@Component)
클래스 레벨 (클래스 선언부 위)
내가 직접 작성한 비즈니스 로직 클래스
스프링이 컴포넌트 스캔으로 자동 검색
낮음 (하나의 클래스는 하나의 빈으로만 등록)

수동 등록 (@Bean)
메서드 레벨 (@Configuration 클래스 내부)
외부 라이브러리 객체 또는 글로벌 설정
개발자가 메서드로 직접 객체를 생성하여 반환
높음 (조건에 따라 다른 객체를 반환하도록 제어 가능)

• 자동 등록을 쓰는 경우: 내가 개발하는 서비스(@Service),
컨트롤러(@Controller), 리포지토리(@Repository) 등
일반적인 비즈니스 로직은 자동 등록을 기본으로 사용합니다.
생산성이 높고 코드가 깔끔해집니다.

• 수동 등록을 쓰는 경우: 외부 라이브러리(예: JWT 관련 객체,
 Security 설정, Querydsl 등)처럼 소스 코드를 수정할 수
 없는 클래스를 빈으로 등록해야 할 때 씁니다.
 또한 애플리케이션 전반에 걸쳐 공통적으로 적용되는
 기술 지원 객체를 명확하게 드러내고 싶을 때 사용합니다.

 @Transactional
    public MissingPostResponseDto createPost(
            MissingPostRequestDto requestDto, String username){
        //1.현재 로그인한 유저의 아이디를 기반으로 DB에서 유저 정보를 조회
        Member member = memberRepository.findByName(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 입니다"));

        MissingPost post = new MissingPost();
        post.setTitle(requestDto.getTitle());
        post.setContent(requestDto.getContent());
        post.setBreed(requestDto.getBreed());
        post.setGender(requestDto.getGender());
        post.setAge(requestDto.getAge());
        post.setWeight(requestDto.getWeight());
        post.setColor(requestDto.getColor());
        post.setRescueLocation(requestDto.getRescueLocation());
        post.setMediaUrls(requestDto.getMediaUrls());
        post.setStatus(PostStatus.MISSING);
        post.setAuthor(member);//누락

        MissingPost savePost = missingPostRepository.save(post);
        return new MissingPostResponseDto(savePost);
    }

*/