// ページの読み込みを待つ
window.addEventListener('load', main);

function main() {
  const canvas = document.querySelector("#myCanvas")
  const renderer = new THREE.WebGLRenderer({canvas})

  const fov = 75; // field of view 垂直方向に７５度
  const aspect = 2; // 表示アスペクト　デフォルトは2
  const near = 0.1; // near と far は、レンダリングされるカメラの前のスペースを表します。 その範囲の前またはその範囲の後はクリップされます（描画されません）
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 2; // カメラはデフォルトで、Yを上にして-Z軸を見下ろします

  const scene = new THREE.Scene(); // three.jsの Scene は、シーングラフのフォームのルートです

  // ボックスのデータが含まれている BoxGeometry を作成します
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); //基本的なマテリアルを作成し、色を設定します

  const cube = new THREE.Mesh(geometry, material); // Mesh は Geometry (オブジェクトの形状)と Material （オブジェクトの描画方法、光沢または平坦、適用する色、適用するテクステャなど）を組み合わせます

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ]
  
  // renderer.render(scene, camera);

  // ディレクショナルライトを作成
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  function render(time) {
    time *= 0.001;

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}