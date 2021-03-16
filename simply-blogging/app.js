function addBlog() {
    var post = {
        title: document.getElementById("title").value,
        article: document.getElementById("article").value,
        imageId: document.getElementById("imageId").files[0].name,
        date: new Date()
    };
    var blogs = JSON.parse(sessionStorage.getItem('blogs')) || [];
    blogs.push(post);
    sessionStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.reload();
}
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("article").value = "";
    document.getElementById("imageId").value = "";
}

//Parses the json object
var posts = JSON.parse(sessionStorage.getItem('blogs'));
posts.sort(function(a, b){
    return new Date(b.date) - new Date(a.date)
})

var postList = document.getElementById('data');

//Loops through session data to display blog posts
for (let index = 0; index < posts.length; index++) {
    var row = '<div class="post-preview">';
    row += `
        <a href = "#" >
        <h2 class="post-title">`+ posts[index].title +`</h2>
        <h3 class="post-subtitle">`
        + posts[index].article + 
        `</h3>
        </a >
        <div class="text-center">
            <img src="` + posts[index].imageId + `" class="img-fluid " alt="..." style="width: 40%">
        </div>
                    <p class="post-meta">Posted by
            <a href="#">User</a>
            on ` + new Date(posts[index].date).toISOString().slice(0,10) + `
        </p>
        </div>
        <hr>
    `
        
    postList.innerHTML += row;

}
