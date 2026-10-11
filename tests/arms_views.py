from playwright.sync_api import sync_playwright
THREE=open('node_modules/three/build/three.min.js').read()
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-sandbox'])
    pg=b.new_page(viewport={'width':720,'height':450});pg.set_default_timeout(280000)
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]));pg.on('console',lambda m:errs.append('C:'+m.text[:160]) if m.type in('error','warning') and 'ERR_FAILED' not in m.text else None)
    pg.add_init_script("try{localStorage.tw=JSON.stringify({gfx:1})}catch(e){}")
    pg.route('**/three.min.js',lambda r:r.fulfill(body=THREE,content_type='application/javascript'))
    pg.route('**/fonts.g*/**',lambda r:r.abort())
    pg.goto('file://'+__import__('os').path.abspath('../index.html')+'');pg.wait_for_timeout(3000)
    pg.evaluate("""()=>{state='hold';document.getElementById('ui').style.display='none';document.getElementById('hud').style.display='none';document.getElementById('tl').style.display='none';
      PH.pw=PH.pwv=1;PH.aim=0;for(let i=0;i<30;i++)animH(PH,.033,0,0,.05,false,false,0);ph.position.set(0,.2,0);ph.rotation.y=0;cam.fov=38;cam.updateProjectionMatrix();
      window.__v=(x,y,z,lx,ly,lz)=>{cam.position.set(x,y,z);cam.lookAt(lx,ly,lz)}}""")
    views=[('arm_front',"4.0,2.5,0,.3,2.1,0"),('arm_right',"0.6,2.3,3.8,.5,2.1,.3"),('arm_left',"0.6,2.3,-3.8,.5,2.1,-.3"),('hand_right',"2.0,2.2,1.4,.3,1.95,.1"),('hand_left',"2.2,2.2,-1.2,.9,1.95,0"),('arm_rear34',"-2.6,2.9,2.6,0,2.1,.3")]
    for name,v in views:
        pg.evaluate(f"__v({v})");pg.wait_for_timeout(2500);pg.screenshot(path=f'torso_{name}.png');print('shot',name,flush=True)
    print('console problems:',errs[:4]);b.close()
