import pymupdf
from typing import List

cur = "Gadhadã I – 1 "

file1 = open("backend/storage/output.txt", "r")

list: List[str]  = file1.readlines()

toAdd: List[str] = []

count:int = 0

file3 = open("backend/test.txt", "w")
file3.write("test")

s:str
for s in list:
   temp = s.strip()

   if(len(temp) == 0):
      continue

   index: int = s.find("End of")
   decimal: int = s.find(".")
   if index != -1:
      name:str = s[index+6 :]
      name = name.replace("||", "")
      file2 = open("backend/storage/Vachanamrut/" + name.strip() + ".txt", "w")
      file2.writelines(toAdd)
      toAdd.clear()
      count += 1
      continue

   # if s.isspace() or s.find("\f") != -1 or (s[0] == s[-1] and s[0] == '-'):
   if s.find("\f") != -1 or (temp[0] == temp[-1] and temp[0] == '-'):
      continue
   elif decimal != -1:
      if temp[0:decimal].strip().isdecimal() and temp[decimal+1:].strip().isdecimal():
         toAdd.append("\n" + s.strip() + ": ")
      else:
         toAdd.append(s)
   else:
      toAdd.append(s)



