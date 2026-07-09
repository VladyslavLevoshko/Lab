function getHTMLElements(){
    const input = document.querySelector<HTMLInputElement>('#input');
    const preview = document.querySelector<HTMLDivElement>('#preview');
    return {input, preview}
}

function assertExists<T>(element:T | null | undefined, message:string):asserts element is T{
    if(!element) throw new Error(message);
}

function getHTMLInputFile(input:HTMLInputElement):File{
    if(!input.files || input.files.length === 0) throw new Error('No file in input');
    return input.files[0]
}

function addImageOnPage(image:HTMLImageElement, place:HTMLDivElement){
    place.replaceChildren(image)
}

function createImage(file:File) : HTMLImageElement {
    const image = document.createElement('img');
    const imageURL = URL.createObjectURL(file);
    image.src = imageURL;
    image.onload = () => URL.revokeObjectURL(imageURL)
    return image
}

const {input, preview} = getHTMLElements();

assertExists(input, 'Can not find input element on HTML page');
assertExists(preview, 'Can not find preview element on HTML page');

input.addEventListener('change', () => {
    const file = getHTMLInputFile(input);
    const image = createImage(file);
    addImageOnPage(image, preview);
});
