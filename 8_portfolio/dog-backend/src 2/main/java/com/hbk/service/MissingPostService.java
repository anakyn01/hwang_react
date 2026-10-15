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

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MissingPostService {

    private final MissingPostRepository missingPostRepository;
    private final MemberRepository memberRepository;

    // 실종 신고글 작성 (DTO, 파일, 유저 이메일 수신)
    @Transactional
    public MissingPostResponseDto createPost(
            MissingPostRequestDto requestDto,
            MultipartFile file,
            String username
    ){
        // 1. 현재 로그인한 유저의 이메일을 기반으로 DB에서 유저 정보를 조회
        Member member = memberRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 입니다"));

        // 2. 파일이 존재할 경우 서버에 저장하고 URL을 DTO의 mediaUrls에 추가
        if (file != null && !file.isEmpty()) {
            try {
                String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                String uploadDir = System.getProperty("user.dir") + "/uploads/";
                java.nio.file.Path path = java.nio.file.Paths.get(uploadDir + filename);

                java.nio.file.Files.createDirectories(path.getParent());
                java.nio.file.Files.write(path, file.getBytes());

                String imageUrl = "http://localhost:8080/uploads/" + filename;

                if (requestDto.getMediaUrls() == null) {
                    requestDto.setMediaUrls(new java.util.ArrayList<>());
                }
                requestDto.getMediaUrls().add(imageUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

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
        post.setAuthor(member);
        post.setCreatedAt(LocalDateTime.now());

        MissingPost savePost = missingPostRepository.save(post);
        System.out.println("========== [DB 저장 완료 ID: " + savePost.getId() + "] ==========");
        return new MissingPostResponseDto(savePost);
    }

    // 무한 스크롤 조회
    public List<MissingPostResponseDto> getPostByScroll(Long cursorId, int size){
        Pageable pageable = PageRequest.of(0, size);
        List<MissingPost> posts = missingPostRepository.findAllByCursor(cursorId, pageable);

        return posts.stream().map(MissingPostResponseDto::new)
                .collect(Collectors.toList());
    }

    // 글 수정 (본인 확인)
    @Transactional
    public MissingPostResponseDto updatePost(Long id, MissingPostRequestDto requestDto, String username){
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        if(!post.getAuthor().getEmail().equals(username)){
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

        if (requestDto.getMediaUrls() != null && !requestDto.getMediaUrls().isEmpty()) {
            post.setMediaUrls(requestDto.getMediaUrls());
        }

        return new MissingPostResponseDto(post);
    }

    // 글 삭제 (본인 확인)
    @Transactional
    public void deletePost(Long id, String username){
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("해당 게시글이 없습니다  id=" + id));

        if(!post.getAuthor().getEmail().equals(username)){
            throw new SecurityException("삭제 권한이 없습니다");
        }

        missingPostRepository.delete(post);
    }

    // 완료 처리 (찾았을 경우 상태 변경)
    @Transactional
    public void completPost(Long id, String username){
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다 id=" + id));

        if(!post.getAuthor().getEmail().equals(username)){
            throw new SecurityException("권한이 없습니다");
        }
        post.setStatus(PostStatus.COMPLETED);
    }
}