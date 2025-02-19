// nowa wersja
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // ✅ List of video IDs that SHOULD SHOW recommended videos (ALLOW-LIST)
        const allowRecommendations = [
            "xAKqXcG3b7k", // OSTATNI ODCINEK Z ŹYCIA BZIKA
            "wF2eobbOGrs", // jak wyjść z balachy ?
            "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
            "7gv8e54TxdU"  // PRZEGRAŁEM
        ];

        // **Block recommendations for ALL videos, unless manually allowed**
        const isAllowed = allowRecommendations.includes(videoId);
        const relValue = isAllowed ? "0" : "0"; // rel=0 only works for allowed videos
        const extraParams = isAllowed 
            ? "" 
            : "&controls=0&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&playlist=" + videoId; // Blocks overlays

        function loadVideo() {
            // Remove existing iframe to prevent duplicates
            videoContainer.innerHTML = "";

            // Create YouTube iframe
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            // Ensure correct scaling inside parent div
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.objectFit = "contain"; // Ensures video fits properly

            // Append iframe inside the container
            videoContainer.appendChild(iframe);
        }

        // Attach event listener to the play button
        playButton.addEventListener("click", loadVideo);
    });
});