async function fetchBookByFields(bookName, bookLimit, ...fields){
    var fetchUrl = createQuery(bookName, bookLimit, fields);
    console.log("fetching: " + fetchUrl);

    try{
        var response = await fetch(fetchUrl);
        if (response.status != 200) throw new Error("Failed request");
        var jsonBody = await response.json();
    } catch (error) {
        return {
            message: "failed request",
            reason: "server temporarily down"
        }
    }

    return jsonBody;
}

async function fetchBookSummary(bookPath){
    var url = `https://openlibrary.org${bookPath}.json`

    try{
        var response = await fetch(url);
        var jsonBody = await response.json();

        if (!jsonBody.description) {
            console.log("no description")
            throw new Error("Failed request");
        }

        return jsonBody.description && jsonBody.description.value != undefined ? jsonBody.description.value : "N/A";
    } catch (error){
        return "N/A";
    }   
}

function createQuery(bookName, bookLimit, ...fields){
    var baseUrl = "https://openlibrary.org/search.json?q=";

    var fields = fields.join(",");
    var bookPath = bookName.split(" ").join("+");
    var queryPath = "&fields=" + fields
    var limitParam = `&limit=${bookLimit}`;

    return baseUrl + bookPath + queryPath + limitParam;
}

export async function getBooks(bookName, bookLimit =5) {
    var bookList = [];
    var promises = [];

    const data = await fetchBookByFields(bookName, bookLimit, "title", "author_name", "subject", "key");

    if(data.numFound === 0) return {message: "No books found", reason: "No books found with the given name"};

    data.docs.forEach((book, index) => {

        var path = book.key;
        var returnedJson = fetchBookSummary(path).then(description =>{
                return {
                    id: index,
                    title: book.title,
                    author: book.author_name === undefined ? "N/A" : book.author_name[0], 
                    genre: book.subject === undefined ? "N/A" : book.subject[0],
                    summary: description
                }

        })
        promises.push(returnedJson);
    })

    // Use await with Promise.all to wait for all promises to resolve
    bookList = await Promise.all(promises);
    return bookList;
}

export async function getDetailedBooks(bookName, bookLimit =5) {
    var bookList = [];

    const data = await fetchBookByFields(bookName, bookLimit);
    const promises = data.docs.map(book => {
        var path = book.key;
        return fetchBookSummary(path).then(description => {
            return {
                title: book.title,
                author: book.author_name === undefined ? "N/A" : book.author_name[0], 
                genre: book.subject === undefined ? "N/A" : book.subject[0],
                publish_date: book.publish_date === undefined ? "N/A" : book.publish_date[0],
                edition_count: book.edition_count === undefined ? "N/A" : book.edition_count,
                language: book.language === undefined ? "N/A" : book.language[0],
                first_publish_year: book.first_publish_year === undefined ? "N/A" : book.first_publish_year,
                isbn: book.isbn === undefined ? "N/A" : book.isbn[0],
                summary: description
            };
        });
    });

    bookList = await Promise.all(promises);

    return bookList;
}

export async function getBookById(bookName, id){
    var numberedBookList = await getBooks(bookName, 10);
    console.log(numberedBookList);
    var book = numberedBookList.find(book => book.id === Number(id));
    console.log(book);

    if(book){
        delete book.id;
        return book;
    }

    console.log("Book not found");
}
