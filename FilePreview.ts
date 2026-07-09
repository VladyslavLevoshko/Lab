function getHTMLElements() {
    return {
        input: document.querySelector<HTMLInputElement>('#input'),
        preview: document.querySelector<HTMLDivElement>('#preview'),
        dropZone: document.querySelector<HTMLDivElement>('#dropZone')
    };
}

function assertExists<T>(element:T | null | undefined, message:string):asserts element is T{
    if(element == null || element == undefined) throw new Error(message);
}

function getHTMLInputFile(input:HTMLInputElement):File{
    const file = input.files?.[0];
    if(!file){
        throw new Error('No file in input')
    }
    return file
}

function renderImage(image:HTMLImageElement, place:HTMLDivElement){
    place.replaceChildren(image)
}

function createImage(file:File) : HTMLImageElement {
    const image = document.createElement('img');
    const imageURL = URL.createObjectURL(file);
    image.onload = () => URL.revokeObjectURL(imageURL);
    image.src = imageURL;
    return image
}

function showPreview(file:File, place:HTMLDivElement){
    const image = createImage(file);
    renderImage(image, place)
}

const {input, preview, dropZone} = getHTMLElements();

assertExists(input, 'Can not find input element on HTML page');
assertExists(preview, 'Can not find preview element on HTML page');
assertExists(dropZone, 'Can not find drop zone on HTML page')

input.addEventListener('change', () => {
    const file = getHTMLInputFile(input);
    showPreview(file, preview)
});

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    assertExists(file, 'file not found')
    showPreview(file, preview)
});
