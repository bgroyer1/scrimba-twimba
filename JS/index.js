import { tweetsData } from "./data.js"

const tweetBtn = document.querySelector("#tweet-btn")
const tweetInput = document.querySelector("#tweet-input")

tweetBtn.addEventListener("click", () => {
    console.log(tweetInput.value)
    tweetInput.value = ''
})

document.addEventListener("click", (e) => {
    if (e.target.dataset.like) {
        console.log(e.target.dataset.like)}
})

function handleLikeClick() {
    
}

function getFeedHTML() {
    let feedHTML = ''
    tweetsData.forEach((tweet) => {
        feedHTML += `
                <div class="tweet">
                    <div class="tweet-inner">
                        <img src=${tweet.profilePic} class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots"
                                    data-reply="${tweet.uuid}></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-heart" data-likes="${tweet.uuid}"></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>            
                    </div>
                </div>`
    })
    return feedHTML
}

function renderFeed() {
    document.querySelector("#feed").innerHTML = getFeedHTML()
}

renderFeed()

