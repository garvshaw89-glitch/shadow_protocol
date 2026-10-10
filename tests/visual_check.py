import sys,json
from playwright.sync_api import sync_playwright
THREE=open('node_modules/three/build/three.min.js').read()
sizes={'1920x1080':(1920,1080),'1366x768':(1366,768),'1024x768':(1024,768),'390x844':(390,844),'844x390':(844,390)}
tag=sys.argv[1]; only=sys.argv[2:] or list(sizes)
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-sandbox'])
    for k in only:
        w,h=sizes[k]
        ctx=b.new_context(viewport={'width':w,'height':h},has_touch=w<500 or h<400)
        pg=ctx.new_page()
        errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        pg.on('console',lambda m:errs.append('C:'+m.text[:160]) if m.type=='error' else None)
        pg.route('**/three.min.js',lambda r:r.fulfill(body=THREE,content_type='application/javascript'))
        pg.route('**/fonts.g*/**',lambda r:r.abort())
        pg.goto('file://'+__import__('os').path.abspath('../index.html')+'')
        pg.wait_for_timeout(2800)
        m=pg.evaluate("""()=>{const d=document.documentElement,u=document.getElementById('ui'),o=document.getElementById('op');return {docSW:d.scrollWidth,docCW:d.clientWidth,docSH:d.scrollHeight,docCH:d.clientHeight,uiSW:u.scrollWidth,uiCW:u.clientWidth,uiSH:u.scrollHeight,uiCH:u.clientHeight,canvas:[document.getElementById('c').clientWidth,document.getElementById('c').clientHeight],logo:(()=>{const l=document.querySelector('.logo');if(!l)return null;const r=l.getBoundingClientRect();return [Math.round(r.left),Math.round(r.right),l.scrollWidth,l.clientWidth]})()}}""")
        pg.screenshot(path=f'{tag}_{k}.png')
        print(k,json.dumps(m),errs[:3])
        ctx.close()
    b.close()
