function entrarComo(rol) {
  const selector = document.getElementById("selector-rol");
  if (selector) selector.classList.add("oculto");
  document.getElementById("contenido").classList.remove("oculto");

  if (rol === "organizador") {
    document.getElementById("menu-organizador").classList.remove("oculto");
    mostrarFormulario("evento");
  } else {
    document.getElementById("menu-organizador").classList.add("oculto");
    mostrarFormulario("registro-evento");
  }
}

function mostrarFormulario(tipo) {
  const formularios = ["evento", "ubicacion", "contacto", "registro-evento", "consulta-eventos", "manual-usuario"];
  formularios.forEach(f => {
    const elem = document.getElementById(`formulario-${f}`) || document.getElementById(f);
    if (elem) elem.classList.add("oculto");
  });

  if (tipo !== "ocultarTodo") {
    const formulario = document.getElementById(`formulario-${tipo}`) || document.getElementById(tipo);
    if (formulario) formulario.classList.remove("oculto");
  }
}

// Guardar evento en localStorage
function registrarEvento(e) {
  e.preventDefault();

  const evento = {
    titulo: document.getElementById("tituloEvento").value,
    invitados: document.getElementById("invitados").value,
    fechaHora: document.getElementById("fechaHora").value,
    zonaHoraria: document.getElementById("zonaHoraria").value,
    descripcion: document.getElementById("descripcion").value,
    repeticion: document.getElementById("repeticion").value,
    recordatorio: document.getElementById("recordatorio").value,
    clasificacion: document.getElementById("clasificacion").value,
    lugar: document.getElementById("lugar").value
  };

  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  eventos.push(evento);
  localStorage.setItem("eventos", JSON.stringify(eventos));

  alert("✅ Evento guardado.");
  e.target.reset();
}

// Mostrar eventos guardados
function mostrarConsulta() {
  mostrarFormulario("consulta-eventos");
  const tbody = document.querySelector("#tabla-eventos tbody");
  tbody.innerHTML = "";

  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

  if (eventos.length === 0) {
    tbody.innerHTML = "<tr><td colspan='6'>No hay eventos registrados.</td></tr>";
    return;
  }

  eventos.forEach(evento => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${evento.titulo}</td>
      <td>${evento.invitados}</td>
      <td>${evento.fechaHora}</td>
      <td>${evento.zonaHoraria}</td>
      <td>${evento.lugar}</td>
      <td>${evento.clasificacion}</td>
    `;
    tbody.appendChild(fila);
  });
}

// Eliminar todos los eventos almacenados
function eliminarTodosLosEventos() {
  if (confirm("¿Deseas eliminar todos los eventos?")) {
    localStorage.removeItem("eventos");
    mostrarConsulta();
  }
}

// Registrar ubicación (solo muestra alerta y limpia el formulario)
function registrarUbicacion(e) {
  e.preventDefault();
  alert("✅ Ubicación registrada.");
  e.target.reset();
}

// Registrar contacto (solo alerta y limpia formulario)
function registrarContacto(e) {
  e.preventDefault();
  alert("✅ Contacto registrado.");
  e.target.reset();
}

// Registro de participante en evento (alerta y limpia)
function registrarseEvento(e) {
  e.preventDefault();
  alert("🎉 ¡Registro exitoso!");
  e.target.reset();
}

// Mostrar manual de usuario
function mostrarManual() {
  mostrarFormulario("manual-usuario");
}

// Cerrar manual
function cerrarManual() {
  document.getElementById("manual-usuario").classList.add("oculto");
}

// Mostrar consulta de eventos desde selector inicial
function mostrarConsultaDesdeInicio() {
  const selector = document.getElementById("selector-rol");
  if (selector) selector.classList.add("oculto");
  document.getElementById("contenido").classList.remove("oculto");
  document.getElementById("menu-organizador").classList.add("oculto");
  mostrarConsulta();
}

// Mostrar manual desde selector inicial
function mostrarManualDesdeInicio() {
  const selector = document.getElementById("selector-rol");
  if (selector) selector.classList.add("oculto");
  document.getElementById("contenido").classList.remove("oculto");
  document.getElementById("menu-organizador").classList.add("oculto");
  mostrarManual();
}

// Inicializa el traductor de Google
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'es',
    includedLanguages: 'en,fr,de,it,pt,ja,zh-CN',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

