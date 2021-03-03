// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    0.1,
    1000
  );
  // カメラの初期座標を設定
  camera.position.set(0, 0, 5);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera);

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // 3DS形式のモデルデータを読み込む
  const loader = new THREE.TDSLoader();
  // テクスチャーのパスを指定
  loader.setPath('models/textures/');
  // 3dsファイルのパスを指定
  loader.load('models/portalgun.3ds', object => {
      object.scale.set(1,1,1);
      object.position.set(0,0,0);
    // 読み込み後に3D空間に追加
    scene.add(object);
  });

  tick();
  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}