import time
from playwright.sync_api import sync_playwright
THREE=open('node_modules/three/build/three.min.js').read()
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-sandbox'])
    pg=b.new_page(viewport={'width':900,'height':560});pg.set_default_timeout(200000)
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.add_init_script("try{localStorage.tw=JSON.stringify({gfx:0})}catch(e){}")
    pg.route('**/three.min.js',lambda r:r.fulfill(body=THREE,content_type='application/javascript'))
    pg.route('**/fonts.g*/**',lambda r:r.abort())
    pg.goto('file://'+__import__('os').path.abspath('../index.html')+'');pg.wait_for_timeout(1500)
    pg.locator('#op .nv',has_text='TRAINING').click()
    for i in range(120):
        pg.wait_for_timeout(1500)
        if pg.evaluate("document.body.dataset.st")=='play':break
    print('play reached',flush=True)
    print('touch ctrls visible on desktop:',pg.evaluate("getComputedStyle(document.getElementById('tc')).display"),flush=True)
    pg.evaluate("""()=>{P.hp=P.hpm=1e6;setHeld(PH,'AR');P.sw=0;window.__fcMode=null;window.__fc=(cam,P,PH)=>{const m=window.__fcMode;if(!m)return;const c=Math.cos(P.yaw),s=Math.sin(P.yaw);cam.position.set(P.x+(m.f*c-m.r*s),m.h,P.z+(m.f*s+m.r*c));cam.lookAt(P.x+c*.7+(-s)*m.lz,m.ly,P.z+s*.7+c*m.lz)}}""")
    shots=[('aim_right',"{f:1.9,r:2.6,h:2.3,lz:0,ly:1.8}",True),('aim_front34',"{f:3.4,r:-2.2,h:2.5,lz:0,ly:1.8}",True),('aim_top',"{f:.6,r:1.4,h:4.2,lz:0,ly:1.6}",True),('low_ready_side',"{f:.2,r:3.8,h:2.0,lz:0,ly:1.7}",False)]
    for name,mode,aim in shots:
        pg.evaluate(f"rmb={'true' if aim else 'false'}");pg.evaluate(f"window.__fcMode={mode}");pg.wait_for_timeout(3500)
        pg.screenshot(path=f'h_{name}.png');print('shot',name,flush=True)
    print('errors',errs[:3]);b.close()
