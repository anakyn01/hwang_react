#HumanDev
i = input()
x=[]

for word in i.split():
    x.append(word)
    
y = ''.join(x)
z = ''.join(c for c in y[::-1] if c not in 'ong')
#veDamuH


