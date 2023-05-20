const url = 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';
const blog_section = document.getElementById("blogs");
const postTitles = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(blog => {
            const cardElement = createCardElement(blog);
            blog_section.appendChild(cardElement);
            const titleAnchors = document.querySelectorAll(".post-title a");
            titleAnchors.forEach(titleAnchor => {
                postTitles.push(titleAnchor);
            });
        });
        // Iterate through each post title element
        // console.log(postTitles);
        postTitles.forEach(titleAnchor => {
            console.log(titleAnchor.textContent);
            if (titleAnchor) {
                const titleLength = titleAnchor.textContent.length;
                console.log(titleLength);

                // Check if the height is smaller than a certain threshold
                if (titleLength < 40 && window.innerWidth > 768) {
                    console.log("less than 40", titleAnchor.parentNode);
                    // Add additional padding to the element
                    titleAnchor.parentNode.style.marginBottom = '11vh';

                    if (window.innerWidth < 972) {
                        titleAnchor.parentNode.style.marginBottom = '1vh';
                        console.log('True')
                    }
                    else if (window.innerWidth > 971 && window.innerWidth < 1300) {
                        titleAnchor.parentNode.style.marginBottom = '7vh';
                        console.log('True')
                    }
                }
            }
        });
    })

function createCardElement(card) {
    const cardElement = document.createElement('div');
    const cardCol = document.createElement('div');
    const cardInner = document.createElement('div');

    // Inner Elements
    const category = document.createElement('h2');
    const description = document.createElement('div');
    const title = document.createElement('h3');
    const title_link = document.createElement('a');
    const desc_p = document.createElement('p');
    const link = document.createElement('a');
    const card_image = document.createElement('img');
    const card_footer = document.createElement('div');
    const card_footer_p = document.createElement('p');

    // Elements classes
    cardElement.className = "row";
    cardCol.className = "col-4 post-container";
    cardInner.className = "p-card card-pad";
    category.className = "p-card__inner u-no-margin--bottom heading"
    card_image.className = "p-card__inner card-image";
    title.className = "post-title";
    description.className = "p-card__inner card-description";
    desc_p.className = "post-author";
    card_footer.className = "p-card__inner card-footer";

    // Base boxes
    cardElement.appendChild(cardCol);
    cardCol.appendChild(cardInner);

    // Inner card children
    cardInner.appendChild(category);
    cardInner.appendChild(createDividerElement());
    cardInner.appendChild(card_image);
    cardInner.appendChild(description);
    cardInner.appendChild(createDividerElement());
    cardInner.appendChild(card_footer);


    // Set the text content and attributes
    category.textContent = 'CLOUD AND SERVER';
    card_image.src = card.featured_media;
    card_image.alt = 'Image of Ubuntu';

    // Description set up
    description.appendChild(title);
    description.appendChild(desc_p);
    title.appendChild(title_link);
    title_link.textContent = card.title.rendered;
    title_link.href = card.link;

    const textBy = document.createTextNode('By ');
    const textOn = document.createTextNode(' on ');

    // Convert GMT date to human readable date in locale
    const date = new Date(card.date_gmt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const dateNode = document.createTextNode(formattedDate);

    desc_p.appendChild(textBy);
    desc_p.appendChild(link);
    desc_p.appendChild(textOn);

    link.href = card._embedded.author[0].link;
    link.textContent = card._embedded.author[0].name;
    desc_p.appendChild(dateNode);

    // Footer set up
    card_footer.appendChild(card_footer_p);
    card_footer_p.textContent = "Article";

    return cardElement;
}

// Function to create a divider element
function createDividerElement() {
    const divider = document.createElement('div');
    divider.className = "line-divider";
    return divider;
  }
