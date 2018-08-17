const body = document.querySelector("body");

export const createFooter = () => {

    const date = new Date().getFullYear();
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    footer.innerHTML = `
        <div class="container">
            <p> &#169; Copyright Kristina Butkovic ${date}</p>
        </div>
    `;
    body.appendChild(footer);
}