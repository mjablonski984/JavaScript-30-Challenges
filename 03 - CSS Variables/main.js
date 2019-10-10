const inputs = document.querySelectorAll('.controls input');
const values = document.querySelectorAll('.controls .val');

values.forEach(val => {
  val.textContent = (val.parentElement.nextElementSibling.value)
})
function changes() {
  //console.log(this.value, this.dataset.sizing);

  const suffix = this.dataset.sizing || '';

  // Use document element to access root element and CSS variables
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

  values.forEach(val => {
    val.textContent = (val.parentElement.nextElementSibling.value)
  })
}

inputs.forEach(input => input.addEventListener('change', changes));
inputs.forEach(input => input.addEventListener('mousemove', changes));
