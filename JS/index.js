import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

document.addEventListener("click", (e) => {
	if (e.target.dataset.like) {
		handleLikeClick(e.target.dataset.like)
	} 
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === "tweet-btn") {
        handleTweetBtnClick()
    }
})

function handleLikeClick(tweetID) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetID
    })[0]
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    renderFeed()
}

function handleRetweetClick(tweetID) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetID
    })[0]
    
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    renderFeed()
}

function handleReplyClick(replyID) {
    console.log(document.getElementById(`replies-${replyID}`))
   document.getElementById(`replies-${replyID}`).classList.toggle("hidden")
}

function handleTweetBtnClick() {
    const tweetInput = document.querySelector("#tweet-input")
    if (tweetInput.value) {
        tweetsData.unshift({
            handle: "@scrimba",
            profilePic: "./IMG/scrimbalogo.png",
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    }
    renderFeed()
    tweetInput.value = ""
}

function getFeedHTML() {
	let feedHTML = ""
	tweetsData.forEach((tweet) => {
        
        let likeIconClass = tweet.isLiked === true ? "liked" : ""
       
        let retweetIconClass = tweet.isRetweeted === true ? "retweeted" : ""

        let repliesHTML = ""

        if (tweet.replies.length > 0) {
            tweet.replies.forEach((reply) => {
                repliesHTML += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
                `
            })
        }

		feedHTML += `
                <div class="tweet">
                    <div class="tweet-inner">
                        <img src=${tweet.profilePic} class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                 <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>            
                    </div>
                    <div class="hidden" id="replies-${tweet.uuid}">
                        ${repliesHTML}
                    </div>  
                </div>
                `
	})
	return feedHTML
}

function renderFeed() {
	document.querySelector("#feed").innerHTML = getFeedHTML()
}

renderFeed()
