//document.getElementById('currentYear').textContent = new Date().getUTCFullYear()

function createNodeFromJson(jsonData) {
  let el = document.getElementById("gridOfCertifications");
  jsonData.certs.forEach(
    (e) =>
      (el.innerHTML += `<div class="col-lg-4 col-sm-6" style="border: 4px solid transparent;">
  <a
    class="portfolio-box"
    href="${e.source}"
    style="background-image: url(${e.source});"
  >
    <div class="portfolio-box-caption">
      <div class="project-name">
        ${e.name}
      </div>
      <div class="project-category text-white-50">
        ${e.date}
      </div>
    </div>
  </a>
</div>`)
  );
}

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => createNodeFromJson(json));
