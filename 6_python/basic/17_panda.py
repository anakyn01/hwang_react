import pandas as pd

df = pd.read_json('data.json')

print(df.to_string())


mydataset = {
    'cars':["BMW","Volvo","Ford"],
    'passings':[3,7,2]
}
myvar = pd.DataFrame(mydataset)

#print(myvar)
