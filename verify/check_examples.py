def order(a,m):
    k,x=1,a%m
    while x!=1: x=x*a%m; k+=1
    return k
ok=[]
def chk(name,cond): ok.append((name,bool(cond)))
n=2026
chk("2026 mods", [n%d for d in (2,5,4,8,3,9,11,7,13,37)]==[0,1,2,2,1,1,2,3,11,28])
chk("1013 prime", all(1013%p for p in range(2,32)))
chk("7452=9*828",7452==9*828); chk("123453=99*1247",123453==99*1247)
chk("45658=37*1234",45658==37*1234); chk("703=19*37",703==19*37)
chk("116667=27*4321",116667==27*4321); chk("783=27*29",783==27*29)
chk("918082=11*83462",918082==11*83462); chk("461267=101*4567",461267==101*4567)
chk("1002001=1001^2",1002001==1001**2)
chk("1283945: 663, 13|, mod7=5", 945-283+1==663 and 1283945%13==0 and 663%7==5==1283945%7)
chk("572572 chain",572572//7==81796 and 81796//11==7436 and 7436//13==572)
chk("950565=77*12345",950565==77*12345)
tab={3:1,9:1,11:2,37:3,101:4,41:5,7:6,13:6,17:16,19:18}
chk("ord table",all(order(10,d)==k for d,k in tab.items()))
chk("half -1",all(pow(10,k//2,d)==d-1 for d,k in tab.items() if k%2==0))
chk("ord27=3",order(10,27)==3)
chk("99999=9*41*271",99999==9*41*271)
chk("chop7 2026->19",(202-2*6)==190 and 19%7==5)
chk("inverses",(10*5)%7==1 and (10*4)%13==1 and (10*12)%17==1 and (10*2)%19==1)
chk("Midy17",5882352+94117647==99999999 and str(10**16//17).zfill(16)=="0588235294117647")
chk("Midy7/13",142+857==999 and 76+923==999 and 10**6//13==76923)
chk("142857 cyc",all(sorted(str(142857*k))==sorted("142857") for k in range(1,7)) and 142857*7==999999)
chk("pow10 mod7",[pow(10,i,7) for i in range(1,7)]==[3,2,6,4,5,1])
isbn=[0,3,0,6,4,0,6,1,5,2]; chk("ISBN",sum((10-i)*x for i,x in enumerate(isbn))==132)
chk("base8",oct(100)=="0o144" and 100%7==2 and 100%9==1)
chk("x11",36*11==396 and 75*11==825 and 123*11==1353)
chk("magic examples",7425-5274==2151 and 8317-1378==6939 and 831-138==693)
# magic A exhaustive: every 4-digit n, every permutation != n, every nonzero digit of diff hidden
import itertools
bad=0
for n in range(1000,10000):
    s=str(n)
    for p in set(itertools.permutations(s)):
        m=int(''.join(p))
        if m==n: continue
        D=abs(n-m); ds=str(D)
        for i,c in enumerate(ds):
            if c=='0': continue
            rest=sum(int(x) for j,x in enumerate(ds) if j!=i)
            ans=(-rest)%9 or 9
            if ans!=int(c): bad+=1
chk("magic A exhaustive",bad==0)
for name,v in ok: print(("OK  " if v else "FAIL"),name)
