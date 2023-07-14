import axios from "axios";
import { API_KEY, elements } from "./refs";
import { fetchBreeds, fetchCatByBreed, createMarkup } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common["x-api-key"] = API_KEY;

fetchBreeds()
    .then(breeds => {
        elements.select.innerHTML = breeds.map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`;
        }).join('');
        new SlimSelect({
            select: elements.select
        })
    })
    .catch(error => console.log(error));

elements.select.addEventListener('change', onSelect)

function onSelect(evt) {
    evt.preventDefault();
    const breedId = evt.currentTarget.value;
    console.log(evt.currentTarget.value)
    fetchCatByBreed(breedId)
        .then(data => {
            elements.container.innerHTML = createMarkup(data);
        })
        .catch((error) => {
            console.log(error);
            elements.select.style.display = 'none';
            elements.loader.style.display = 'none';
            elements.error.style.display = "block";
        });
}