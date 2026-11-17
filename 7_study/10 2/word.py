class good:
    li = ["seoul","Kyeonggi","inchon","daejeon","daegu","pusan"]
    
g = good()
str01 = ''
for i in g.li:
    str01 = str01 + i[0]
print(str01)