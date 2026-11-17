class Node:
    def __init__(self, value):
        self.value = value #노드에 들어갈 실제 숫자
        self.children = [] 
        # 이노드 아래에 연결될 자식 노드들을 담을 빈리스트
        
#1차원 리스트(li)를 받아서 이진 트리로 조립해 주는 함수
def tree(li):
    nodes = [Node(i) for i in li] 
    #리스트안의 모든 숫자를 각각 Node객체로 만들어 리스트로 묶습니다
    
    for i in range(1, len(li)):
        nodes[(i-1) // 2].children.append(nodes[i])
    return nodes[0]
    #nodes[부모인덱스].children 리스트안에 나 자신(nodes[i])return nodes[0]

#트리를 순회하면서 조건에 맞는 숫자만 더하는 재귀함수 (level의 기본값은 0)
def calc(node, level=0): #함수가 시작될때 맨처음 노드(root)가 들어오고
    #1. 종료조건(안전장치)
    if node is None:#만약 들어온 노드가 아무것도 없다면 계산할 값이 없으니 0을 돌려주고 끝냄
        return 0
    
    #2진짜 계산
    return( node.value if level % 2 == 1 else 0) + sum(calc(n, level + 1) for n in node.children) 


li = [3,5,8,12,15,18,21]
'''
3 트리의 먄위 root 레벨 0
5 (i-1) // 0  / 2 0 숫자 3의 루트 0 자식
8 ( 2- 1) 1 / 2 =0.5 3의 자식
12 (3-1) 
15
18
21

숫자 5의 노드 최종결과 5
숫자 8의 노드 최종결과 8
'''


root = tree(li)

print(calc(root))
"""
node.value if level % 2 == 1 else 0 내 값을 더할까 말까 결정
level을 2로 나눠서..나머지가 1이면 홀수층이면
내진짜 숫자를 챙김 만약짝수층이면 내 숫자는 무시하고 0을 챙김

sum(calc(n, level + 1) for n in node.children) 
내 밑에 있는 자식들아 너희들도 각자 계산해서 결과 가져와
for n in node.children 내 자식들을 하나씩 꺼내서
calc(n, level + 1) 자식들에게 다시 이함수를 시킵니다
단 자식은 나보다 한층 아래에 있으니
층수를 1증가 level + 1시켜 보냅니다
sum(...)자식드링 구해오 ㄴ결과를 모두 하나로 합침

1번 인덱스(두 번째 숫자)부터 끝까지 돌면서 부모 자식 관계를 연결
왜 0[뿌리 root 이 아니라 1번째 
[(i-1) // 2 내인덱스 i를 통해 내 부모의 인덱스를 알아내는 수학공식
// 나눗셈의 몫만 구함
"""
               




'''
1차원 리스트에 있는 이진트리형태
데이터를 계층적으로 저장하는 자료구조중에 하나로
모든 노드의 자식노드 개수가 최대 2개이하인 트리
각각 왼쪽자식과 오른쪽자식으로 명호가하게 구분
로 만들고 
트리를 탐색하면서 특정 깊이(홀수 레벨)에
있는 숫자들만 골라서 합산하는 문제
'''
