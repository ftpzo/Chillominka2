

console.log('✓ Script.js cargado correctamente');

  
  
  function cambiarSeccion(id){
    document.querySelectorAll('.page').forEach(function(sec){
      sec.classList.remove('activa');
    });
    var target = document.getElementById(id);
    if(target){ target.classList.add('activa'); }

    document.querySelectorAll('.nav-link').forEach(function(link){
      link.classList.toggle('active', link.dataset.section === id);
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
