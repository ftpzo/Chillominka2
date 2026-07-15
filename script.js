

console.log('✓ Script.js cargado correctamente');

  
  
  function cambiarSeccion(id){
    document.querySelectorAll('.page').forEach(function(sec){
      sec.classList.remove('activa');
    });
    var target = document.getElementById(id);
    if(target){ target.classList.add('activa'); }

    document.querySelectorAll('.nav-link').forEach(function(link){
      
      if (id === 'mi-perfil') {
        link.classList.remove('active');
      } else {
        link.classList.toggle('active', link.dataset.section === id);
      }
    });

    whatsappShown = false;
    whatsappNavLock = true;
    if(whatsappFloat){ whatsappFloat.classList.remove('visible'); }

    window.scrollTo({top:0, behavior:'smooth'});
    cerrarMenuMovil();
    setTimeout(activarRevealVisibles, 60);
    setTimeout(function(){
      whatsappNavLock = false;
      checkWhatsappVisibility();
    }, 500);

    
    if (id === 'mi-perfil') {
      setTimeout(function(){
        var u = typeof auth !== 'undefined' && auth.currentUser;
        if (u) rellenarSeccionPerfil(u);
        else cambiarSeccion('inicio');
      }, 200);
    }
  }

  
  document.querySelectorAll('.nav-link').forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      cambiarSeccion(link.dataset.section);
    });
  });

  
  function irAImpacto(){
    cambiarSeccion('quienes-somos');
    setTimeout(function(){
      var el = document.getElementById('impacto-quienes');
      if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }, 150);
  }

  
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var navMenu = document.getElementById('navMenu');
  hamburgerBtn.addEventListener('click', function(){
    hamburgerBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  function cerrarMenuMovil(){
    hamburgerBtn.classList.remove('open');
    navMenu.classList.remove('open');
  }

  
  function cambiarTab(btn, panelId){
    var tabs = btn.parentElement.querySelectorAll('.tab-btn');
    tabs.forEach(function(t){ t.classList.remove('active'); });
    btn.classList.add('active');

    var panels = document.querySelectorAll('#emprendimientos .tab-panel');
    panels.forEach(function(p){ p.classList.remove('activa'); });
    document.getElementById(panelId).classList.add('activa');
    setTimeout(activarRevealVisibles, 60);
  }

  
  function cambiarBlogTab(btn, panelId){
    var tabs = btn.parentElement.querySelectorAll('.tab-btn');
    tabs.forEach(function(t){ t.classList.remove('active'); });
    btn.classList.add('active');

    
    var panels = document.querySelectorAll('#comunidad .blog-list, #comunidad .tab-panel');
    panels.forEach(function(p){ p.classList.remove('activa'); });
    document.getElementById(panelId).classList.add('activa');
    setTimeout(activarRevealVisibles, 60);
  }

  
  var modalOverlay = document.getElementById('modalOverlay');
  function abrirModal(){ modalOverlay.classList.add('show'); }
  function cerrarModal(){ modalOverlay.classList.remove('show'); }
  function cerrarModalDesdeOverlay(e){ if(e.target === modalOverlay){ cerrarModal(); } }

  
  
  
  
  var modal3DOverlay = null;
  var modelViewer3D = null;
  var modal3DTitle = null;
  
  
  function inicializarModal3D(){
    modal3DOverlay = document.getElementById('modal3DOverlay');
    modelViewer3D = document.getElementById('modelViewer3D');
    modal3DTitle = document.getElementById('modal3DTitle');
    
    if (modal3DOverlay && modelViewer3D && modal3DTitle) {
      console.log('✓ Modal 3D inicializado correctamente');
      return true;
    } else {
      console.warn('⚠ Elementos del modal 3D no encontrados, reintentando...');
      return false;
    }
  }
  
  
  if (!inicializarModal3D()) {
    setTimeout(inicializarModal3D, 500);
  }

  function abrirModal3D(modelSrc, nombreProducto){
    console.log('Abriendo Modal 3D:', nombreProducto, 'Ruta:', modelSrc);
    
    
    if (!modelViewer3D || !modal3DOverlay) {
      console.log('Reintentar inicialización...');
      inicializarModal3D();
    }
    
    if (!modelViewer3D) {
      console.error('ERROR: modelViewer3D no disponible');
      return;
    }
    
    try {
      
      modelViewer3D.setAttribute('src', modelSrc);
      console.log('✓ setAttribute src ejecutado');
      
      
      if (modal3DTitle) {
        modal3DTitle.textContent = nombreProducto;
      }
      
      
      if (modal3DOverlay) {
        modal3DOverlay.classList.add('show');
        console.log('✓ Modal mostrado con clase .show');
      }
    } catch (e) {
      console.error('Error al abrir modal 3D:', e);
    }
  }
  
  function cerrarModal3D(){
    if (modal3DOverlay) {
      modal3DOverlay.classList.remove('show');
    }
    if (modelViewer3D) {
      modelViewer3D.removeAttribute('src');
    }
    console.log('Modal 3D cerrado');
  }
  
  function cerrarModal3DDesdeOverlay(e){ 
    if(e && e.target === modal3DOverlay){ 
      cerrarModal3D(); 
    } 
  }

  
  if (modelViewer3D) {
    modelViewer3D.addEventListener('load', function(){
      console.log('✓ Modelo 3D cargado');
    });
    modelViewer3D.addEventListener('error', function(e){
      console.error('✗ Error al cargar modelo 3D:', e);
    });
  }

  
  
  
  
  
  var modalBlogOverlay = document.getElementById('modalBlogOverlay');
  var modalBlogImg = document.getElementById('modalBlogImg');
  var modalBlogTag = document.getElementById('modalBlogTag');
  var modalBlogTitle = document.getElementById('modalBlogTitle');
  var modalBlogText = document.getElementById('modalBlogText');

  function abrirModalBlog(cardEl){
    var img = cardEl.querySelector('img');
    var tag = cardEl.querySelector('.tag-pill');
    var titulo = cardEl.querySelector('h4');
    var textoCompleto = cardEl.querySelector('.blog-full-text');

    modalBlogImg.src = img.src;
    modalBlogImg.alt = img.alt;
    modalBlogTag.textContent = tag.textContent;
    modalBlogTag.className = 'tag-pill ' + (tag.classList.contains('orange') ? 'orange' : 'green');
    modalBlogTitle.textContent = titulo.textContent;
    modalBlogText.innerHTML = textoCompleto ? textoCompleto.innerHTML : '';

    modalBlogOverlay.classList.add('show');
    modalBlogOverlay.scrollTop = 0;
  }
  function cerrarModalBlog(){ modalBlogOverlay.classList.remove('show'); }
  function cerrarModalBlogDesdeOverlay(e){ if(e.target === modalBlogOverlay){ cerrarModalBlog(); } }

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      cerrarModal();
      cerrarModal3D();
      cerrarModalBlog();
    }
    
    
    if((e.key === 'Enter' || e.key === ' ') &&
       (e.target.classList.contains('product-img-wrap') || e.target.classList.contains('blog-card'))){
      e.preventDefault();
      e.target.click();
    }
  });

  
  
  function toggleFaq(btn){
    var item = btn.closest('.faq-item');
    var answer = item.querySelector('.faq-answer');
    var isOpen = item.classList.contains('open');

    if(isOpen){
      answer.style.maxHeight = '0px';
      item.classList.remove('open');
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

  
  function enviarFormulario(e){
    e.preventDefault();
    document.getElementById('formMsg').classList.add('show');
    e.target.reset();
  }

  
  
  
  
  
  var whatsappFloat = document.getElementById('whatsappFloat');
  var whatsappShown = false;
  var whatsappNavLock = false; 

  function checkWhatsappVisibility(){
    if(!whatsappFloat || whatsappShown || whatsappNavLock) return;
    var llegoAlFinal = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);
    if(llegoAlFinal){
      whatsappShown = true;
      whatsappFloat.classList.add('visible');
    }
  }

  window.addEventListener('scroll', checkWhatsappVisibility);
  window.addEventListener('resize', checkWhatsappVisibility);
  checkWhatsappVisibility(); 

  
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});

  function activarRevealVisibles(){
    document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){
      revealObserver.observe(el);
    });
  }
  activarRevealVisibles();

  
  var carruselIndices = {};

  window.abrirEmpModal = function(id){
    var modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.add('abierto');
    document.body.style.overflow = 'hidden';
    var num = id.replace('emp-modal-','');
    var carouselId = 'carousel-' + num;
    if(carruselIndices[carouselId] === undefined){
      iniciarCarrusel(carouselId);
    }
  };

  window.cerrarEmpModal = function(id){
    var modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.remove('abierto');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.emp-modal').forEach(function(modal){
    modal.addEventListener('click', function(e){
      if(e.target === modal) cerrarEmpModal(modal.id);
    });
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('.emp-modal.abierto').forEach(function(m){
        cerrarEmpModal(m.id);
      });
    }
  });

  
  function iniciarCarrusel(carouselId){
    var carousel = document.getElementById(carouselId);
    if(!carousel) return;
    var track = carousel.querySelector('.emp-carousel-track');
    var imgs = track.querySelectorAll('img');
    var total = imgs.length;
    carruselIndices[carouselId] = 0;

    var dotsContainer = document.getElementById('dots-' + carouselId);
    if(dotsContainer){
      dotsContainer.innerHTML = '';
      imgs.forEach(function(_, i){
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' activo' : '');
        dot.setAttribute('aria-label', 'Ir a imagen ' + (i+1));
        (function(idx){
          dot.addEventListener('click', function(){
            carruselIndices[carouselId] = idx;
            actualizarCarrusel(carouselId, track, dotsContainer, total);
          });
        })(i);
        dotsContainer.appendChild(dot);
      });
    }

    actualizarCarrusel(carouselId, track, dotsContainer, total);
  }

  function actualizarCarrusel(carouselId, track, dotsContainer, total){
    var idx = carruselIndices[carouselId];
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    if(dotsContainer){
      dotsContainer.querySelectorAll('.carousel-dot').forEach(function(d,i){
        d.classList.toggle('activo', i === idx);
      });
    }
  }

  window.moverCarrusel = function(carouselId, dir){
    var carousel = document.getElementById(carouselId);
    if(!carousel) return;
    var track = carousel.querySelector('.emp-carousel-track');
    var total = track.querySelectorAll('img').length;
    if(carruselIndices[carouselId] === undefined) carruselIndices[carouselId] = 0;
    carruselIndices[carouselId] = (carruselIndices[carouselId] + dir + total) % total;
    var dotsContainer = document.getElementById('dots-' + carouselId);
    actualizarCarrusel(carouselId, track, dotsContainer, total);
  };

  
  var planSeleccionado = '';

  window.abrirPlanes = function(){
    document.getElementById('modal-planes').classList.add('abierto');
    document.body.style.overflow = 'hidden';
    mostrarVista('seleccion');
  };

  window.cerrarPlanes = function(){
    document.getElementById('modal-planes').classList.remove('abierto');
    document.body.style.overflow = '';
  };

  window.cerrarPlanesFondo = function(e){
    if(e.target === document.getElementById('modal-planes')) cerrarPlanes();
  };

  window.seleccionarPlan = function(nombre, precio){
    planSeleccionado = nombre;
    document.getElementById('pago-plan-nombre').textContent = 'Plan ' + nombre;
    document.getElementById('pago-plan-precio').textContent = precio;
    var monto = parseFloat(precio.replace('$','').replace('/mes',''));
    var iva = (monto * 0.12).toFixed(2);
    var total = (monto * 1.12).toFixed(2);
    document.getElementById('pago-subtotal').textContent = '$' + monto.toFixed(2);
    document.getElementById('pago-iva').textContent = '$' + iva;
    document.getElementById('pago-total').textContent = '$' + total;
    mostrarVista('pago');
  };

  window.volverPlanes = function(){ mostrarVista('seleccion'); };

  window.selMetodo = function(btn, metodo){
    document.querySelectorAll('.metodo-btn').forEach(function(b){ b.classList.remove('activo'); });
    btn.classList.add('activo');
    document.getElementById('metodo-tarjeta').style.display = metodo === 'tarjeta' ? 'block' : 'none';
    document.getElementById('metodo-transferencia').style.display = metodo === 'transferencia' ? 'block' : 'none';
    document.getElementById('metodo-paypal').style.display = metodo === 'paypal' ? 'block' : 'none';
  };

  window.procesarPago = function(){
    document.getElementById('conf-plan').textContent = planSeleccionado;
    mostrarVista('confirmacion');
  };

  window.formatarTarjeta = function(input){
    var v = input.value.replace(/\D/g,'').substring(0,16);
    input.value = v.replace(/(.{4})/g,'$1 ').trim();
  };

  window.formatarFecha = function(input){
    var v = input.value.replace(/\D/g,'').substring(0,4);
    if(v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2);
    input.value = v;
  };

  function mostrarVista(vista){
    document.getElementById('planes-vista-seleccion').style.display = vista === 'seleccion' ? 'block' : 'none';
    document.getElementById('planes-vista-pago').style.display = vista === 'pago' ? 'block' : 'none';
    document.getElementById('planes-vista-confirmacion').style.display = vista === 'confirmacion' ? 'block' : 'none';
  }

  
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') cerrarPlanes();
  });
var contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = contactForm.querySelector('button[type="submit"]');
    if(btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
    var data = new FormData(contactForm);
    fetch('https://formspree.io/f/maqggknq', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function(response){
      if(response.ok){
        window.location.href = 'https://chillominka.com/gracias.html';
      } else {
        if(btn) { btn.disabled = false; btn.textContent = 'Enviar mensaje'; }
        var msgEl = document.getElementById('formMsg');
        if(msgEl){
          msgEl.textContent = 'Error al enviar. Intenta de nuevo o escríbenos a minkachillo@gmail.com';
          msgEl.style.cssText = 'display:block;background:#fdecea;color:#c0392b;border:1px solid #f5a4a4;border-radius:10px;padding:14px 16px;margin-top:12px;font-size:14px;';
        }
      }
    }).catch(function(){
      contactForm.submit();
    });
  });
}




var firebaseConfig = {
  apiKey: "AIzaSyC_r4iOZQRBNyb-ONxvaZg-sK4zqiEviaY",
  authDomain: "chillominka.firebaseapp.com",
  projectId: "chillominka",
  storageBucket: "chillominka.firebasestorage.app",
  messagingSenderId: "467783692613",
  appId: "1:467783692613:web:142d5848281e60ce420e2c",
  measurementId: "G-YVWQQT0CNS"
};
firebase.initializeApp(firebaseConfig);
var auth    = firebase.auth();
var db      = firebase.firestore();
var storage = firebase.storage();
var providerGoogle = new firebase.auth.GoogleAuthProvider();

var SVG_AVATAR_DEFAULT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23bbb'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/%3E%3C/svg%3E";

var PLANES_INFO = {
  'Bronce':          { color:'#cd7f32', beneficios:['Inscripción Gratuita','Creación de Identidad Visual','2 Redes Sociales','5 Post · 3 Historias · 4 Reels · 1 Carrusel','1 Publicidad Digital','Obsequio de bienvenida','1 Reporte mensual'] },
  'Plata':           { color:'#aaa',    beneficios:['Inscripción Gratuita','Creación de Identidad Visual','3 Redes Sociales','10 Post · 5 Historias · 8 Reels · 2 Carruseles','3 Publicidades Digitales','Obsequio de bienvenida','1 Reporte mensual'] },
  'Oro':             { color:'#f5a623', beneficios:['Inscripción Gratuita','Creación de Identidad Visual','5 Redes Sociales','15 Post · 10 Historias · 15 Reels · 3 Carruseles','5 Publicidades Digitales','Obsequio de bienvenida','1 Reporte mensual'] },
  'Comunidad':       { color:'#4caf50', beneficios:['Inscripción gratuita','Tarjeta de emprendimiento','Reparto de contactos'] },
  'Marca':           { color:'#2196f3', beneficios:['Inscripción gratuita','Tarjeta de emprendimiento','Reparto de contactos','Creación de identidad Visual','Gestión de Redes Sociales'] },
  'Impulso Digital': { color:'#e91e63', beneficios:['Inscripción gratuita','Tarjeta de emprendimiento','Reparto de contactos','Creación de identidad Visual','Gestión de Redes Sociales','Plan de Trabajo profesional','Publicidad promocional','Souvenirs Personalizados'] }
};


auth.onAuthStateChanged(function(user) {
  var btnLoginNav       = document.getElementById('btnLoginNav');
  var avatarDropWrap    = document.getElementById('avatarDropdownWrap');
  var avatarNavImg      = document.getElementById('avatarNavImg');
  var avatarDropImg     = document.getElementById('avatarDropImg');
  var avatarDropNombre  = document.getElementById('avatarDropNombre');
  var avatarDropEmail   = document.getElementById('avatarDropEmail');

  if (user) {
    if (btnLoginNav)    btnLoginNav.style.display    = 'none';
    if (avatarDropWrap) avatarDropWrap.style.display = 'flex';

    
    var fotoInicial = user.photoURL || SVG_AVATAR_DEFAULT;
    if (avatarNavImg)  avatarNavImg.src  = fotoInicial;
    if (avatarDropImg) avatarDropImg.src = fotoInicial;

    
    var nombreInicial = user.displayName || user.email.split('@')[0];
    if (avatarDropNombre) avatarDropNombre.textContent = nombreInicial;
    if (avatarDropEmail)  avatarDropEmail.textContent  = user.email;

    
    var navNombrEl = document.getElementById('avatarNavNombre');
    if (navNombrEl) navNombrEl.textContent = (user.displayName || user.email.split('@')[0]).split(' ')[0];

    
    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
      var datos = doc.exists ? doc.data() : {};
      var fotoFirestore   = datos.foto   || user.photoURL    || SVG_AVATAR_DEFAULT;
      var nombreFirestore = datos.nombre || user.displayName || user.email.split('@')[0];
      if (avatarNavImg)    avatarNavImg.src             = fotoFirestore;
      if (avatarDropImg)   avatarDropImg.src            = fotoFirestore;
      if (avatarDropNombre)avatarDropNombre.textContent = nombreFirestore;
      
      var navNEl = document.getElementById('avatarNavNombre');
      if (navNEl) navNEl.textContent = nombreFirestore.split(' ')[0];
    });

  } else {
    if (btnLoginNav)    btnLoginNav.style.display    = 'flex';
    if (avatarDropWrap) avatarDropWrap.style.display = 'none';
    cerrarDropdownPerfil();
    
    var sp = document.getElementById('mi-perfil');
    if (sp && sp.classList.contains('activa')) cambiarSeccion('inicio');
  }
});


function toggleDropdownPerfil(e) {
  if (e) e.stopPropagation();
  var dd = document.getElementById('avatarDropdown');
  if (!dd) return;
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}
function cerrarDropdownPerfil() {
  var dd = document.getElementById('avatarDropdown');
  if (dd) dd.style.display = 'none';
}

document.addEventListener('click', function(e) {
  var wrap = document.getElementById('avatarDropdownWrap');
  if (wrap && !wrap.contains(e.target)) cerrarDropdownPerfil();
});


function irAlPerfil() {
  cerrarDropdownPerfil();
  var user = auth.currentUser;
  if (!user) { abrirModalLogin(); return; }
  
  document.querySelectorAll('.nav-link').forEach(function(l){ l.classList.remove('active'); });
  
  document.querySelectorAll('.page').forEach(function(s){ s.classList.remove('activa'); });
  var seccion = document.getElementById('mi-perfil');
  if (seccion) seccion.classList.add('activa');
  window.scrollTo({top:0, behavior:'smooth'});
  setTimeout(function() { rellenarSeccionPerfil(user); }, 150);
}


function rellenarSeccionPerfil(user) {
  if (!user) return;
  db.collection('usuarios').doc(user.uid).get().then(function(doc) {
    var datos  = doc.exists ? doc.data() : {};
    var nombre = datos.nombre      || user.displayName || user.email.split('@')[0] || '';
    var foto   = datos.foto        || user.photoURL    || SVG_AVATAR_DEFAULT;
    var desc   = datos.descripcion || '';
    var plan   = datos.plan        || '';
    var fecha  = datos.planFecha   || '';
    var cover  = datos.cover || '';

    
    var coverEl      = document.getElementById('perfilCoverBg');
    var coverPreview = document.getElementById('perfilCoverEditorPreview');
    if (coverEl)      coverEl.src      = 'Imagenes/fondo grande.jpg';
    if (coverPreview) coverPreview.src = 'Imagenes/fondo grande.jpg';

    
    if (cover) {
      if (coverEl)      coverEl.src      = cover;
      if (coverPreview) coverPreview.src = cover;
    }

    
    var ids = ['perfilPaginaFoto','perfilEditorFotoPreview'];
    ids.forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.src = foto;
    });

    
    var mapa = {
      'perfilPaginaNombre': nombre || 'Sin nombre',
      'perfilPaginaEmail':  user.email,
      'perfilPaginaDesc':   desc || '',
      'perfilInfoEmail':    user.email
    };
    Object.keys(mapa).forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.textContent = mapa[id];
    });

    var ubicacion = datos.ubicacion || 'Chillogallo, Quito, Ecuador';
    var miembro   = datos.miembro   || 'Miembro de Chillominka';

    
    var ubEl = document.getElementById('perfilInfoUbicacion');
    var miEl = document.getElementById('perfilInfoMiembro');
    if (ubEl) ubEl.textContent = ubicacion;
    if (miEl) miEl.textContent = miembro;

    
    var inpN = document.getElementById('perfilPaginaNombreInput');
    var inpD = document.getElementById('perfilPaginaDescInput');
    var inpU = document.getElementById('perfilPaginaUbicacionInput');
    var inpM = document.getElementById('perfilPaginaMiembroInput');
    if (inpN) inpN.value = nombre;
    if (inpD) inpD.value = desc;
    if (inpU) inpU.value = ubicacion;
    if (inpM) inpM.value = miembro;

    
    var badge = document.getElementById('perfilPaginaPlanBadge');
    if (badge) {
      if (plan) {
        var bInfo = PLANES_INFO[plan] || {};
        badge.style.display    = 'inline-flex';
        badge.style.background = bInfo.color || '#555';
        badge.textContent      = '⭐ Plan ' + plan;
      } else {
        badge.style.display = 'none';
      }
    }

    
    var sinPlan = document.getElementById('perfilPaginaSinPlan');
    var conPlan = document.getElementById('perfilPaginaConPlan');
    if (plan) {
      if (sinPlan) sinPlan.style.display = 'none';
      if (conPlan) conPlan.style.display = 'block';
      var pN = document.getElementById('perfilPaginaPlanNombre');
      var pF = document.getElementById('perfilPaginaPlanFecha');
      var pB = document.getElementById('perfilPaginaPlanBeneficios');
      var pC = document.getElementById('perfilPaginaPlanCard');
      if (pN) pN.textContent = 'Plan ' + plan;
      if (pF) pF.textContent = fecha ? 'Activo desde: ' + fecha : 'Plan activo';
      var pInfo = PLANES_INFO[plan] || { beneficios:[], color:'#555' };
      if (pC) pC.style.borderColor = pInfo.color;
      if (pB) {
        pB.innerHTML = '';
        pInfo.beneficios.forEach(function(b){
          var li = document.createElement('li');
          li.textContent = b;
          pB.appendChild(li);
        });
      }
    } else {
      if (sinPlan) sinPlan.style.display = 'block';
      if (conPlan) conPlan.style.display = 'none';
    }

    
    var editor    = document.getElementById('perfil-editor');
    var btnEditar = document.getElementById('btnEditarPerfil');
    if (editor)    editor.style.display = 'none';
    if (btnEditar) btnEditar.innerHTML  = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Editar perfil';

    
    console.log('[Perfil] Cargado:', nombre, foto ? 'con foto' : 'sin foto');
  }).catch(function(err){
    console.error('[Perfil] Error cargando datos:', err);
  });
}


function toggleEditarPerfil() {
  var editor    = document.getElementById('perfil-editor');
  var btnEditar = document.getElementById('btnEditarPerfil');
  if (!editor) return;

  if (editor.style.display === 'none' || editor.style.display === '') {
    
    var fotoEl   = document.getElementById('perfilPaginaFoto');
    var previewEl= document.getElementById('perfilEditorFotoPreview');
    if (fotoEl && previewEl) previewEl.src = fotoEl.src;
    
    var coverEl      = document.getElementById('perfilCoverBg');
    var coverPreview = document.getElementById('perfilCoverEditorPreview');
    if (coverEl && coverPreview) coverPreview.src = coverEl.src;
    editor.style.display = 'block';
    if (btnEditar) btnEditar.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg> Cancelar';
    editor.scrollIntoView({ behavior:'smooth', block:'nearest' });
  } else {
    editor.style.display = 'none';
    if (btnEditar) btnEditar.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Editar perfil';
  }
}


function guardarPerfilPagina() {
  var user = auth.currentUser;
  if (!user) return;
  var nuevoNombre = document.getElementById('perfilPaginaNombreInput').value.trim();
  var nuevaDesc   = document.getElementById('perfilPaginaDescInput').value.trim();
  if (!nuevoNombre) { mostrarMsgEditor('Escribe tu nombre.', false); return; }

  var nuevaUbi  = (document.getElementById('perfilPaginaUbicacionInput') || {}).value || '';
  var nuevoMiem = (document.getElementById('perfilPaginaMiembroInput')   || {}).value || '';

  user.updateProfile({ displayName: nuevoNombre }).then(function() {
    return db.collection('usuarios').doc(user.uid).set({
      nombre:      nuevoNombre,
      descripcion: nuevaDesc,
      ubicacion:   nuevaUbi  || 'Chillogallo, Quito, Ecuador',
      miembro:     nuevoMiem || 'Miembro de Chillominka'
    }, { merge: true });
  }).then(function() {
    
    var elNombre = document.getElementById('perfilPaginaNombre');
    var elDesc   = document.getElementById('perfilPaginaDesc');
    var elUbi    = document.getElementById('perfilInfoUbicacion');
    var elMiem   = document.getElementById('perfilInfoMiembro');
    if (elNombre) elNombre.textContent = nuevoNombre;
    if (elDesc)   elDesc.textContent   = nuevaDesc;
    if (elUbi)    elUbi.textContent    = nuevaUbi  || 'Chillogallo, Quito, Ecuador';
    if (elMiem)   elMiem.textContent   = nuevoMiem || 'Miembro de Chillominka';
    
    var navNomEl  = document.getElementById('avatarNavNombre');
    var dropNomEl = document.getElementById('avatarDropNombre');
    if (navNomEl)  navNomEl.textContent  = nuevoNombre.split(' ')[0];
    if (dropNomEl) dropNomEl.textContent = nuevoNombre;
    mostrarMsgEditor('¡Perfil actualizado correctamente!', true);
    setTimeout(function() { toggleEditarPerfil(); }, 1500);
  }).catch(function() {
    mostrarMsgEditor('Error al guardar. Intenta de nuevo.', false);
  });
}
function guardarPerfil() { guardarPerfilPagina(); }


function cambiarFotoPerfil(input) {
  var user = auth.currentUser;
  if (!user || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { mostrarMsgFoto('La imagen no debe superar 5MB.', false); return; }
  mostrarMsgFoto('Subiendo foto...', true);
  var ref = storage.ref('usuarios/' + user.uid + '/perfil.jpg');
  ref.put(file).then(function() {
    return ref.getDownloadURL();
  }).then(function(url) {
    
    return user.updateProfile({ photoURL: url }).then(function() {
      return db.collection('usuarios').doc(user.uid).set({ foto: url }, { merge: true });
    }).then(function() {
      var ids = ['perfilPaginaFoto','perfilEditorFotoPreview','avatarNavImg','avatarDropImg'];
      ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.src = url;
      });
      mostrarMsgFoto('¡Foto actualizada!', true);
    });
  }).catch(function(err) { mostrarMsgFoto('Error: ' + err.message, false); });
}


function cambiarCoverPerfil(input) {
  var user = auth.currentUser;
  if (!user || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 8 * 1024 * 1024) { mostrarMsgCover('La imagen no debe superar 8MB.', false); return; }
  mostrarMsgCover('Subiendo portada...', true);

  var ref = storage.ref('usuarios/' + user.uid + '/cover.jpg');
  ref.put(file).then(function() {
    return ref.getDownloadURL();
  }).then(function(url) {
    
    return db.collection('usuarios').doc(user.uid).set({ cover: url }, { merge: true }).then(function() {
      
      var coverEl      = document.getElementById('perfilCoverBg');
      var coverPreview = document.getElementById('perfilCoverEditorPreview');
      if (coverEl)      { coverEl.src = url; }
      if (coverPreview) { coverPreview.src = url; }
      mostrarMsgCover('¡Portada actualizada!', true);
    });
  }).catch(function(err) {
    mostrarMsgCover('Error: ' + err.message, false);
  });
}

function mostrarMsgCover(msg, ok) {
  var el = document.getElementById('perfilCoverMsg');
  if (!el) return;
  el.textContent = msg;
  el.style.cssText = ok
    ? 'display:block;color:#2e7d32;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:6px 10px;font-size:13px;margin-top:6px;'
    : 'display:block;color:#c0392b;background:#fdecea;border:1px solid #f5a4a4;border-radius:8px;padding:6px 10px;font-size:13px;margin-top:6px;';
}


function solicitarActivacionPlan()       { solicitarActivacionPlanPagina(); }
function solicitarActivacionPlanPagina() {
  var user = auth.currentUser;
  if (!user) return;
  var inputEl = document.getElementById('inputTransaccionPaypalPagina');
  var txId    = inputEl ? inputEl.value.trim() : '';
  if (!txId) { mostrarMsgPlan('Ingresa tu ID de transacción de PayPal.', false); return; }
  db.collection('solicitudes_plan').add({
    uid: user.uid, email: user.email, nombre: user.displayName || '',
    transaccion: txId, fecha: new Date().toLocaleDateString('es-EC'), estado: 'pendiente'
  }).then(function() {
    if (inputEl) inputEl.value = '';
    mostrarMsgPlan('Solicitud enviada. Activaremos tu plan en menos de 24 horas.', true);
  }).catch(function() { mostrarMsgPlan('Error al enviar. Intenta de nuevo.', false); });
}


function cerrarSesion() {
  cerrarDropdownPerfil();
  auth.signOut().then(function() {
    
    var coverEl = document.getElementById('perfilCoverBg');
    var coverPreview = document.getElementById('perfilCoverEditorPreview');
    if (coverEl)      coverEl.src      = 'Imagenes/fondo grande.jpg';
    if (coverPreview) coverPreview.src = 'Imagenes/fondo grande.jpg';
    
    mostrarMsgSinSesion();
    cambiarSeccion('inicio');
  });
}


function abrirModalLogin() {
  var overlay = document.getElementById('modalLoginOverlay');
  if (overlay) { overlay.classList.add('show'); mostrarVistaLogin('login'); }
}
function cerrarModalLogin() {
  var overlay = document.getElementById('modalLoginOverlay');
  if (overlay) overlay.classList.remove('show');
}
function cerrarLoginDesdeOverlay(e) {
  if (e.target === document.getElementById('modalLoginOverlay')) cerrarModalLogin();
}
function cerrarPerfil() {
  var overlay = document.getElementById('modalPerfilOverlay');
  if (overlay) overlay.classList.remove('show');
}
function cerrarPerfilDesdeOverlay(e) {
  if (e.target === document.getElementById('modalPerfilOverlay')) cerrarPerfil();
}
function mostrarVistaLogin(vista) {
  var vL = document.getElementById('login-vista-login');
  var vR = document.getElementById('login-vista-register');
  if (vL) vL.style.display = vista === 'login'    ? 'block' : 'none';
  if (vR) vR.style.display = vista === 'register' ? 'block' : 'none';
  var eL = document.getElementById('loginError');
  var eR = document.getElementById('regError');
  if (eL) eL.style.display = 'none';
  if (eR) eR.style.display = 'none';
}
function loginConGoogle() {
  auth.signInWithPopup(providerGoogle).then(function(result) {
    var user = result.user;
    db.collection('usuarios').doc(user.uid).set(
      { nombre: user.displayName || '', email: user.email, foto: user.photoURL || '' },
      { merge: true }
    );
    cerrarModalLogin();
    setTimeout(verificarCuponesCanjeados, 500);
  }).catch(function(e) { mostrarErrorLogin('loginError', 'Error con Google: ' + e.message); });
}
function loginConEmail() {
  var email = document.getElementById('loginEmail').value.trim();
  var pass  = document.getElementById('loginPassword').value;
  if (!email || !pass) { mostrarErrorLogin('loginError', 'Completa todos los campos.'); return; }
  auth.signInWithEmailAndPassword(email, pass)
    .then(function() {
      cerrarModalLogin();
      setTimeout(verificarCuponesCanjeados, 500);
    })
    .catch(function(e) {
      var msg = 'Correo o contraseña incorrectos.';
      if (e.code === 'auth/user-not-found') msg = 'No existe una cuenta con ese correo.';
      if (e.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
      mostrarErrorLogin('loginError', msg);
    });
}
function registrarConEmail() {
  var nombre = document.getElementById('regNombre').value.trim();
  var email  = document.getElementById('regEmail').value.trim();
  var pass   = document.getElementById('regPassword').value;
  if (!nombre || !email || !pass) { mostrarErrorLogin('regError', 'Completa todos los campos.'); return; }
  if (pass.length < 6) { mostrarErrorLogin('regError', 'La contraseña debe tener al menos 6 caracteres.'); return; }
  auth.createUserWithEmailAndPassword(email, pass).then(function(result) {
    var user = result.user;
    return user.updateProfile({ displayName: nombre }).then(function() {
      return db.collection('usuarios').doc(user.uid).set({
        nombre: nombre, email: email, foto: '', descripcion: '', plan: '', planFecha: ''
      });
    });
  }).then(function() { cerrarModalLogin(); })
  .catch(function(e) {
    var msg = 'Error al crear la cuenta.';
    if (e.code === 'auth/email-already-in-use') msg = 'Ya existe una cuenta con ese correo.';
    mostrarErrorLogin('regError', msg);
  });
}


function mostrarErrorLogin(elId, msg) {
  var el = document.getElementById(elId);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function mostrarMsgEditor(msg, ok) {
  var el = document.getElementById('perfilPaginaMsg');
  if (!el) return;
  el.textContent = msg;
  el.style.cssText = ok
    ? 'display:block;color:#2e7d32;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:8px 12px;font-size:13px;margin-bottom:8px;'
    : 'display:block;color:#c0392b;background:#fdecea;border:1px solid #f5a4a4;border-radius:8px;padding:8px 12px;font-size:13px;margin-bottom:8px;';
}
function mostrarMsgFoto(msg, ok) {
  var el = document.getElementById('perfilFotoMsg');
  if (!el) return;
  el.textContent = msg;
  el.style.cssText = ok
    ? 'display:block;color:#2e7d32;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:6px 10px;font-size:13px;'
    : 'display:block;color:#c0392b;background:#fdecea;border:1px solid #f5a4a4;border-radius:8px;padding:6px 10px;font-size:13px;';
}
function mostrarMsgPlan(msg, ok) {
  var el = document.getElementById('planPaginaMsg');
  if (!el) return;
  el.textContent = msg;
  el.style.cssText = ok
    ? 'display:block;color:#2e7d32;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:6px 10px;font-size:13px;margin-top:6px;'
    : 'display:block;color:#c0392b;background:#fdecea;border:1px solid #f5a4a4;border-radius:8px;padding:6px 10px;font-size:13px;margin-top:6px;';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { cerrarModalLogin(); cerrarPerfil(); cerrarDropdownPerfil(); }
});






var _abrirEmpModalOriginal = window.abrirEmpModal;
window.abrirEmpModal = function(id) {
  _abrirEmpModalOriginal(id);
  cargarComentarios(id);
  actualizarFormComentario(id);
};


function actualizarFormComentario(empId) {
  var user = typeof auth !== 'undefined' ? auth.currentUser : null;
  var form  = document.getElementById('comentario-form-'    + empId);
  var aviso = document.getElementById('comentario-login-aviso-' + empId);
  var avatarEl = document.getElementById('comentario-avatar-' + empId);

  if (user) {
    if (form)  form.style.display  = 'flex';
    if (aviso) aviso.style.display = 'none';
    if (avatarEl) {
      avatarEl.src = user.photoURL || SVG_AVATAR_DEFAULT;
      
      db.collection('usuarios').doc(user.uid).get().then(function(doc) {
        var foto = (doc.exists && doc.data().foto) ? doc.data().foto : user.photoURL || SVG_AVATAR_DEFAULT;
        avatarEl.src = foto;
      });
    }
    
    var textarea = document.getElementById('comentario-texto-' + empId);
    var chars    = document.getElementById('comentario-chars-' + empId);
    if (textarea && chars) {
      textarea.oninput = function() {
        chars.textContent = textarea.value.length + '/300';
        chars.style.color = textarea.value.length > 280 ? '#c0392b' : '#aaa';
      };
    }
  } else {
    if (form)  form.style.display  = 'none';
    if (aviso) aviso.style.display = 'flex';
  }
}


function cargarComentarios(empId) {
  var lista = document.getElementById('comentarios-lista-' + empId);
  if (!lista) return;
  lista.innerHTML = '<div class="comentarios-cargando"><div class="comentario-spinner"></div> Cargando...</div>';

  db.collection('comentarios')
    .where('empId', '==', empId)
    .orderBy('fecha', 'desc')
    .limit(50)
    .get()
    .then(function(snap) {
      if (snap.empty) {
        lista.innerHTML = '<p class="comentarios-vacio">Sé el primero en comentar.</p>';
        return;
      }
      lista.innerHTML = '';
      snap.forEach(function(doc) {
        var c = doc.data();
        lista.appendChild(crearTarjetaComentario(doc.id, c));
      });
    })
    .catch(function(err) {
      
      db.collection('comentarios')
        .where('empId', '==', empId)
        .get()
        .then(function(snap) {
          if (snap.empty) {
            lista.innerHTML = '<p class="comentarios-vacio">Sé el primero en comentar.</p>';
            return;
          }
          lista.innerHTML = '';
          var docs = [];
          snap.forEach(function(doc) { docs.push({ id: doc.id, data: doc.data() }); });
          docs.sort(function(a, b) { return (b.data.fechaMs || 0) - (a.data.fechaMs || 0); });
          docs.forEach(function(d) { lista.appendChild(crearTarjetaComentario(d.id, d.data)); });
        });
    });
}


function crearTarjetaComentario(id, c) {
  var div = document.createElement('div');
  div.className = 'comentario-item';
  div.id = 'comentario-' + id;

  var fecha = c.fecha ? new Date(c.fecha).toLocaleDateString('es-EC', { day:'numeric', month:'short', year:'numeric' }) : '';

  
  var user = typeof auth !== 'undefined' ? auth.currentUser : null;
  var btnEliminar = (user && user.uid === c.uid)
    ? '<button class="comentario-eliminar" onclick="eliminarComentario(\'' + id + '\',\'' + c.empId + '\')" title="Eliminar"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>'
    : '';

  div.innerHTML =
    '<img src="' + (c.userFoto || SVG_AVATAR_DEFAULT) + '" alt="' + (c.userName || '') + '" class="comentario-avatar-item" onclick="verPerfilUsuario(\'' + c.uid + '\')" title="Ver perfil de ' + (c.userName || 'usuario') + '">' +
    '<div class="comentario-body">' +
      '<div class="comentario-header">' +
        '<span class="comentario-nombre" onclick="verPerfilUsuario(\'' + c.uid + '\')">' + (c.userName || 'Usuario') + '</span>' +
        '<span class="comentario-fecha">' + fecha + '</span>' +
        btnEliminar +
      '</div>' +
      '<p class="comentario-texto">' + escapeHtml(c.texto) + '</p>' +
    '</div>';

  return div;
}


function enviarComentario(empId) {
  var user = typeof auth !== 'undefined' ? auth.currentUser : null;
  if (!user) { abrirModalLogin(); return; }

  var textarea = document.getElementById('comentario-texto-' + empId);
  var texto = textarea ? textarea.value.trim() : '';
  if (!texto) return;
  if (texto.length > 300) { alert('El comentario no puede superar 300 caracteres.'); return; }

  var btnEnviar = document.querySelector('#comentario-form-' + empId + ' .comentario-btn-enviar');
  if (btnEnviar) btnEnviar.disabled = true;

  
  db.collection('usuarios').doc(user.uid).get().then(function(doc) {
    var datos = doc.exists ? doc.data() : {};
    var nombre = datos.nombre || user.displayName || user.email.split('@')[0] || 'Usuario';
    var foto   = datos.foto   || user.photoURL    || '';

    var ahora = new Date();
    return db.collection('comentarios').add({
      empId:    empId,
      uid:      user.uid,
      userName: nombre,
      userFoto: foto,
      texto:    texto,
      fecha:    ahora.toISOString(),
      fechaMs:  ahora.getTime()
    });
  }).then(function() {
    if (textarea) textarea.value = '';
    var chars = document.getElementById('comentario-chars-' + empId);
    if (chars) chars.textContent = '0/300';
    if (btnEnviar) btnEnviar.disabled = false;
    cargarComentarios(empId);
  }).catch(function(err) {
    if (btnEnviar) btnEnviar.disabled = false;
    alert('Error al comentar: ' + err.message);
  });
}


var _pendienteEliminarDocId = null;
var _pendienteEliminarEmpId = null;


function eliminarComentario(docId, empId) {
  _pendienteEliminarDocId = docId;
  _pendienteEliminarEmpId = empId;
  document.getElementById('modalConfirmEliminar').classList.add('show');
}

function confirmarEliminar() {
  if (!_pendienteEliminarDocId) return;
  cerrarConfirmEliminar();
  db.collection('comentarios').doc(_pendienteEliminarDocId).delete().then(function() {
    cargarComentarios(_pendienteEliminarEmpId);
    _pendienteEliminarDocId = null;
    _pendienteEliminarEmpId = null;
  });
}

function cerrarConfirmEliminar() {
  document.getElementById('modalConfirmEliminar').classList.remove('show');
}

function cancelarEliminar(e) {
  if (e.target === document.getElementById('modalConfirmEliminar')) cerrarConfirmEliminar();
}


function verPerfilUsuario(uid) {
  var overlay = document.getElementById('modalVerPerfilOverlay');
  if (!overlay) return;

  
  document.getElementById('verPerfilFoto').src    = SVG_AVATAR_DEFAULT;
  document.getElementById('verPerfilNombre').textContent = 'Cargando...';
  document.getElementById('verPerfilEmail').textContent  = '';
  document.getElementById('verPerfilDesc').textContent   = '';
  document.getElementById('verPerfilPlan').style.display = 'none';
  document.getElementById('verPerfilCover').src = 'Imagenes/fondo grande.jpg';

  overlay.classList.add('show');

  db.collection('usuarios').doc(uid).get().then(function(doc) {
    if (!doc.exists) { document.getElementById('verPerfilNombre').textContent = 'Usuario no encontrado'; return; }
    var d = doc.data();

    document.getElementById('verPerfilFoto').src          = d.foto    || SVG_AVATAR_DEFAULT;
    document.getElementById('verPerfilNombre').textContent = d.nombre  || 'Sin nombre';
    document.getElementById('verPerfilEmail').textContent  = d.email   || '';
    document.getElementById('verPerfilDesc').textContent   = d.descripcion || '';
    if (d.cover) document.getElementById('verPerfilCover').src = d.cover;

    var planEl = document.getElementById('verPerfilPlan');
    if (d.plan) {
      var info = PLANES_INFO[d.plan] || {};
      planEl.style.display    = 'inline-flex';
      planEl.style.background = info.color || '#555';
      planEl.textContent      = '⭐ Plan ' + d.plan;
    } else {
      planEl.style.display = 'none';
    }
  });
}

function cerrarVerPerfil(e) {
  var overlay = document.getElementById('modalVerPerfilOverlay');
  if (e.target === overlay) overlay.classList.remove('show');
}


function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/\n/g,'<br>');
}


function abrirModalPlanes() {
  var overlay = document.getElementById('modalPlanesOverlay');
  if (overlay) overlay.classList.add('show');
}
function cerrarModalPlanes(e) {
  var overlay = document.getElementById('modalPlanesOverlay');
  if (!overlay) return;
  if (!e || e.target === overlay) overlay.classList.remove('show');
}



(function() {
  function initFlipCards() {
    document.querySelectorAll('.flip-card').forEach(function(card) {
      
      if (card.dataset.flipInit) return;
      card.dataset.flipInit = '1';

      card.addEventListener('click', function(e) {
        
        var isTactil = window.matchMedia('(hover: none), (pointer: coarse)').matches;
        if (!isTactil) return;
        
        card.classList.toggle('flipped');
      });

      
      card.addEventListener('mouseleave', function() {
        card.classList.remove('flipped');
      });

      
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('flipped');
        }
        if (e.key === 'Escape') {
          card.classList.remove('flipped');
        }
      });

      
      card.addEventListener('blur', function() {
        card.classList.remove('flipped');
      });
    });
  }

  
  document.addEventListener('DOMContentLoaded', initFlipCards);
  
  setTimeout(initFlipCards, 500);
})();






var _abrirEmpModalOrig2 = window.abrirEmpModal;
window.abrirEmpModal = function(id) {
  _abrirEmpModalOrig2(id);
  cargarRating(id);
  actualizarUIRating(id);
};

function cargarRating(empId) {
  db.collection('valoraciones')
    .where('empId', '==', empId)
    .get()
    .then(function(snap) {
      if (snap.empty) {
        actualizarDisplayRating(empId, 0, 0);
        return;
      }
      var total = 0;
      snap.forEach(function(doc) { total += doc.data().valor || 0; });
      var promedio = total / snap.size;
      actualizarDisplayRating(empId, promedio, snap.size);
    });
}

function actualizarDisplayRating(empId, promedio, cantidad) {
  var numEl   = document.getElementById('rating-numero-' + empId);
  var totalEl = document.getElementById('rating-total-'  + empId);
  var starsEl = document.getElementById('rating-estrellas-display-' + empId);

  if (numEl)   numEl.textContent   = cantidad > 0 ? promedio.toFixed(1) : '—';
  if (totalEl) totalEl.textContent = cantidad > 0
    ? '(' + cantidad + (cantidad === 1 ? ' valoración' : ' valoraciones') + ')'
    : 'Sin valoraciones';

  
  if (starsEl) {
    var stars = starsEl.querySelectorAll('.star-display');
    stars.forEach(function(star, i) {
      var fill = Math.min(1, Math.max(0, promedio - i));
      if (fill >= 1)      star.classList.add('star-llena');
      else                star.classList.remove('star-llena');
    });
  }
}

function actualizarUIRating(empId) {
  var user      = typeof auth !== 'undefined' ? auth.currentUser : null;
  var votarWrap = document.getElementById('rating-votar-' + empId);
  var loginMsg  = document.getElementById('rating-login-msg-' + empId);
  var starsInp  = document.getElementById('rating-stars-' + empId);
  var labelEl   = document.getElementById('rating-votar-label-' + empId);

  if (!user) {
    if (starsInp) starsInp.style.display = 'none';
    if (labelEl)  labelEl.style.display  = 'none';
    if (loginMsg) loginMsg.style.display = 'block';
    return;
  }

  if (loginMsg) loginMsg.style.display = 'none';
  if (starsInp) starsInp.style.display = 'flex';
  if (labelEl)  labelEl.style.display  = 'block';

  
  db.collection('valoraciones')
    .where('empId', '==', empId)
    .where('uid', '==', user.uid)
    .get()
    .then(function(snap) {
      if (!snap.empty) {
        var miVoto = snap.docs[0].data().valor;
        marcarStarsSeleccionadas(empId, miVoto);
        if (labelEl) labelEl.textContent = 'Tu valoración: ' + '★'.repeat(miVoto);
      } else {
        marcarStarsSeleccionadas(empId, 0);
        if (labelEl) labelEl.textContent = 'Tu valoración:';
      }
    });
}

function votarEstrella(empId, valor) {
  var user = typeof auth !== 'undefined' ? auth.currentUser : null;
  if (!user) { abrirModalLogin(); return; }

  
  var ref = db.collection('valoraciones')
    .where('empId', '==', empId)
    .where('uid',   '==', user.uid);

  ref.get().then(function(snap) {
    if (!snap.empty) {
      
      return snap.docs[0].ref.update({ valor: valor });
    } else {
      
      return db.collection('valoraciones').add({
        empId: empId,
        uid:   user.uid,
        valor: valor
      });
    }
  }).then(function() {
    marcarStarsSeleccionadas(empId, valor);
    var labelEl = document.getElementById('rating-votar-label-' + empId);
    if (labelEl) labelEl.textContent = 'Tu valoración: ' + '★'.repeat(valor);
    cargarRating(empId); 
  });
}

function hoverStars(empId, valor) {
  var starsEl = document.querySelectorAll('#rating-stars-' + empId + ' .star-btn');
  starsEl.forEach(function(btn, i) {
    btn.classList.toggle('star-hover', i < valor);
  });
}

function resetStarsHover(empId) {
  var starsEl = document.querySelectorAll('#rating-stars-' + empId + ' .star-btn');
  starsEl.forEach(function(btn) { btn.classList.remove('star-hover'); });
}

function marcarStarsSeleccionadas(empId, valor) {
  var starsEl = document.querySelectorAll('#rating-stars-' + empId + ' .star-btn');
  starsEl.forEach(function(btn, i) {
    btn.classList.toggle('star-selected', i < valor);
  });
}




var DIAS_CADUCIDAD = 3;


var MAX_CUPONES_SEMANA = 3;

function canjearCupon(cuponId, codigoCorrecto, juegoNombre, emprendimiento, descuento) {
  var user = typeof auth !== 'undefined' ? auth.currentUser : null;
  if (!user) {
    mostrarMsgCupon(cuponId, 'Debes iniciar sesión para canjear un cupón.', false);
    return;
  }

  var inputEl = document.getElementById('cupon-input-' + cuponId);
  var codigoIngresado = inputEl ? inputEl.value.trim().toUpperCase() : '';

  if (!codigoIngresado) {
    mostrarMsgCupon(cuponId, 'Escribe el código secreto.', false);
    return;
  }
  if (codigoIngresado !== codigoCorrecto.toUpperCase()) {
    mostrarMsgCupon(cuponId, '❌ Código incorrecto. Completa el juego para obtenerlo.', false);
    return;
  }

  var ahora = new Date();

  
  var diaSemana = ahora.getDay() || 7;
  var inicioSemana = new Date(ahora);
  inicioSemana.setHours(0,0,0,0);
  inicioSemana.setDate(ahora.getDate() - (diaSemana - 1));
  var inicioSemanaMs = inicioSemana.getTime();

  
  var inicioDia = new Date(ahora);
  inicioDia.setHours(0,0,0,0);
  var inicioDiaMs = inicioDia.getTime();

  db.collection('cupones')
    .where('uid', '==', user.uid)
    .get()
    .then(function(snap) {

      var yaCanjeado       = false;
      var cuponesEstaSemana = 0;
      var cuponesHoy        = 0;

      snap.forEach(function(doc) {
        var d = doc.data();
        
        if (d.cuponId === cuponId) yaCanjeado = true;
        
        if (d.fechaMs && d.fechaMs >= inicioSemanaMs) cuponesEstaSemana++;
        
        if (d.fechaMs && d.fechaMs >= inicioDiaMs) cuponesHoy++;
      });

      
      if (yaCanjeado) {
        deshabilitarFormCupon(cuponId, '✓ Ya reclamaste este cupón. Está en tu perfil.');
        return;
      }

      
      if (cuponesHoy >= 1) {
        mostrarMsgCupon(cuponId,
          '⏰ Ya canjeaste un cupón hoy. Vuelve mañana para obtener otro. (' + cuponesEstaSemana + '/' + MAX_CUPONES_SEMANA + ' esta semana)',
          false
        );
        return;
      }

      
      if (cuponesEstaSemana >= MAX_CUPONES_SEMANA) {
        mostrarMsgCupon(cuponId,
          '⚠️ Ya alcanzaste los ' + MAX_CUPONES_SEMANA + ' cupones de esta semana. ¡Vuelve el próximo lunes!',
          false
        );
        return;
      }

      
      var caducidad = new Date(ahora.getTime() + DIAS_CADUCIDAD * 24 * 60 * 60 * 1000);

      return db.collection('cupones').add({
        uid:           user.uid,
        cuponId:       cuponId,
        codigo:        codigoCorrecto,
        juego:         juegoNombre,
        emprendimiento:emprendimiento,
        descuento:     descuento,
        fechaCreacion: ahora.toISOString(),
        fechaCaducidad:caducidad.toISOString(),
        fechaMs:       ahora.getTime(),
        caducidadMs:   caducidad.getTime()
      }).then(function() {
        if (inputEl) inputEl.value = '';
        var restantesSemana = MAX_CUPONES_SEMANA - cuponesEstaSemana - 1;
        deshabilitarFormCupon(cuponId,
          '🎉 ¡Cupón canjeado! Ya está en tu perfil. Válido ' + DIAS_CADUCIDAD + ' días.' +
          (restantesSemana > 0
            ? ' Puedes obtener ' + restantesSemana + ' más esta semana (1 por día).'
            : ' ¡Completaste los 3 cupones de esta semana!')
        );
      });
    })
    .catch(function(err) {
      mostrarMsgCupon(cuponId, 'Error al canjear: ' + err.message, false);
    });
}


function deshabilitarFormCupon(cuponId, mensaje) {
  var formEl  = document.getElementById('cupon-form-' + cuponId);
  var msgEl   = document.getElementById('cupon-msg-' + cuponId);
  if (formEl) {
    var inputs  = formEl.querySelectorAll('input, button');
    inputs.forEach(function(el) { el.disabled = true; el.style.opacity = '.5'; });
  }
  if (msgEl) {
    msgEl.textContent = mensaje;
    msgEl.style.cssText = 'display:block;color:#2e7d32;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:8px 12px;font-size:13px;margin-top:8px;';
  }
}

function mostrarMsgCupon(cuponId, msg, ok) {
  var el = document.getElementById('cupon-msg-' + cuponId);
  if (!el) return;
  el.textContent = msg;
  el.style.cssText = ok
    ? 'display:block;color:#2e7d32;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:8px 12px;font-size:13px;margin-top:8px;'
    : 'display:block;color:#c0392b;background:#fdecea;border:1px solid #f5a4a4;border-radius:8px;padding:8px 12px;font-size:13px;margin-top:8px;';
}


function cargarCuponesPerfil(user) {
  var bloqueEl = document.getElementById('perfilCuponesBloque');
  var listaEl  = document.getElementById('perfilCuponesList');
  if (!bloqueEl || !listaEl) return;

  var ahora = Date.now();

  db.collection('cupones')
    .where('uid', '==', user.uid)
    .get()
    .then(function(snap) {
      
      var activos = [];
      var borrar  = [];
      snap.forEach(function(doc) {
        var d = doc.data();
        if (d.caducidadMs && d.caducidadMs < ahora) {
          borrar.push(doc.ref);
        } else {
          activos.push(d);
        }
      });
      
      borrar.forEach(function(ref) { ref.delete(); });

      
      if (activos.length === 0) {
        bloqueEl.style.display = 'none';
        return;
      }

      bloqueEl.style.display = 'block';
      listaEl.innerHTML = '';
      activos.sort(function(a, b) { return (b.fechaMs||0) - (a.fechaMs||0); });

      activos.forEach(function(c) {
        var caducidad  = new Date(c.fechaCaducidad);
        var diasRestantes = Math.ceil((caducidad.getTime() - ahora) / (1000 * 60 * 60 * 24));
        var fechaStr   = caducidad.toLocaleDateString('es-EC', { day:'numeric', month:'short', year:'numeric' });
        var urgente    = diasRestantes <= 1;

        var card = document.createElement('div');
        card.className = 'cupon-card' + (urgente ? ' cupon-urgente' : '');
        card.innerHTML =
          '<div class="cupon-card-left">' +
            '<div class="cupon-codigo">' + c.codigo + '</div>' +
            '<div class="cupon-info">' +
              '<p class="cupon-emp">🏪 ' + c.emprendimiento + '</p>' +
              '<p class="cupon-desc">🎁 ' + c.descuento + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="cupon-card-right">' +
            '<span class="cupon-caduca' + (urgente ? ' cupon-caduca-urgente' : '') + '">' +
              (urgente
                ? '⚠️ ¡Caduca hoy!'
                : '⏰ Caduca el ' + fechaStr) +
            '</span>' +
            '<span class="cupon-dias">' + diasRestantes + ' día' + (diasRestantes !== 1 ? 's' : '') + ' restante' + (diasRestantes !== 1 ? 's' : '') + '</span>' +
          '</div>';

        listaEl.appendChild(card);
      });
    });
}


var _rellenarOriginal = rellenarSeccionPerfil;
rellenarSeccionPerfil = function(user) {
  _rellenarOriginal(user);
  cargarCuponesPerfil(user);
};


function resetearFormsCupones() {
  document.querySelectorAll('[id^="cupon-form-"]').forEach(function(form) {
    var inputs = form.querySelectorAll('input, button');
    inputs.forEach(function(el) { el.disabled = false; el.style.opacity = ''; });
    var inputEl = form.querySelector('input');
    if (inputEl) inputEl.value = '';
  });
  document.querySelectorAll('[id^="cupon-msg-"]').forEach(function(msg) {
    msg.style.display = 'none';
    msg.textContent = '';
  });
}


function mostrarMsgSinSesion() {
  resetearFormsCupones();
  document.querySelectorAll('[id^="cupon-form-"]').forEach(function(form) {
    var id = form.id.replace('cupon-form-', '');
    var inputs = form.querySelectorAll('input, button');
    inputs.forEach(function(el) { el.disabled = true; el.style.opacity = '.5'; });
    mostrarMsgCupon(id,
      '🔒 Inicia sesión para obtener cupones de descuento.',
      false
    );
  });
}


function verificarCuponesCanjeados() {
  var user = typeof auth !== 'undefined' ? auth.currentUser : null;

  
  resetearFormsCupones();

  if (!user) {
    mostrarMsgSinSesion();
    return;
  }

  var ahora = new Date();
  var diaSemana = ahora.getDay() || 7;
  var inicioSemana = new Date(ahora);
  inicioSemana.setHours(0,0,0,0);
  inicioSemana.setDate(ahora.getDate() - (diaSemana - 1));
  var inicioSemanaMs = inicioSemana.getTime();
  var inicioDiaMs = new Date(ahora).setHours(0,0,0,0);

  db.collection('cupones')
    .where('uid', '==', user.uid)
    .get()
    .then(function(snap) {
      var canjeados = {};
      var cuponesEstaSemana = 0;
      var cuponesHoy = 0;

      snap.forEach(function(doc) {
        var d = doc.data();
        canjeados[d.cuponId] = true;
        if (d.fechaMs && d.fechaMs >= inicioSemanaMs) {
          cuponesEstaSemana++;
          if (d.fechaMs >= inicioDiaMs) cuponesHoy++;
        }
      });

      var allForms = document.querySelectorAll('[id^="cupon-form-"]');

      
      Object.keys(canjeados).forEach(function(cuponId) {
        deshabilitarFormCupon(cuponId, '✓ Ya reclamaste este cupón. Está en tu perfil.');
      });

      
      if (cuponesEstaSemana >= MAX_CUPONES_SEMANA) {
        allForms.forEach(function(form) {
          var id = form.id.replace('cupon-form-', '');
          if (!canjeados[id]) {
            mostrarMsgCupon(id,
              '⚠️ Usaste los ' + MAX_CUPONES_SEMANA + ' cupones de esta semana. ¡Vuelve el próximo lunes!',
              false
            );
          }
        });
      } else if (cuponesHoy >= 1) {
        allForms.forEach(function(form) {
          var id = form.id.replace('cupon-form-', '');
          if (!canjeados[id]) {
            mostrarMsgCupon(id,
              '⏰ Ya canjeaste un cupón hoy. Vuelve mañana. (' + cuponesEstaSemana + '/' + MAX_CUPONES_SEMANA + ' esta semana)',
              false
            );
          }
        });
      }
    });
}


document.addEventListener('click', function(e) {
  var btn = e.target.closest('[onclick*="blog-juegos"]');
  if (btn) setTimeout(verificarCuponesCanjeados, 300);
});
