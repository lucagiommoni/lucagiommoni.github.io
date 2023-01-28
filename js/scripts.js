//document.getElementById('currentYear').textContent = new Date().getUTCFullYear()

function createNodeFromJson(jsonData) {
  createComp(jsonData.companies);
  createCerts(jsonData.certs);
}

function createComp(companies) {
  console.log(companies);
  let el = document.getElementById("gridOfCompanies");
  companies.forEach(
    (e) =>
      (el.innerHTML += `<div class="col-12 col-md-3">
            <a href="${e.src}" target="_blank">
              <img
                src="${e.img}"
                alt="${e.name}"
                style="width: 100%"
              />
            </a>
          </div>`)
  );
}

function createCerts(certs) {
  let el = document.getElementById("gridOfCertifications");
  certs.forEach(
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
