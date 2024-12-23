    function showSidebar() {
      const sidebar = document.querySelector('.sidebar');
      const menuButton = document.querySelector('.menu-button'); 
      sidebar.style.display = 'flex';
      menuButton.style.display = 'none';
    }

    function hideSidebar() {
      const sidebar = document.querySelector('.sidebar');
      const menuButton = document.querySelector('.menu-button');
      sidebar.style.display = 'none';
      menuButton.style.display = 'block';
    }

    function toggleDropdown(dropdownID) { 
      var dropdown = document.getElementById(dropdownID); 
      dropdown.classList.toggle('open');
    }

    function plusDivs(n) {
      showDivs(slideIndex += n);
    }

    function showDivs(n) {
      const slides = document.getElementsByClassName("mySlides");
      if (n > slides.length) { 
          slideIndex = 1;
      }    
      if (n < 1) { 
          slideIndex = slides.length;
      }
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
      }
      slides[slideIndex - 1].style.display = "block";  
    }

    // Initialize the slide index and display the first slide
    let slideIndex = 1;
    showDivs(slideIndex);

    let welcomeSlideIndex = 0;
    const welcomeSlides = document.querySelectorAll('.welcome-img');

    function showWelcomeSlides() {
        welcomeSlides.forEach(slide => slide.style.display = "none");
        welcomeSlideIndex++;
        if (welcomeSlideIndex > welcomeSlides.length) {welcomeSlideIndex = 1}
        welcomeSlides[welcomeSlideIndex-1].style.display = "block";
        setTimeout(showWelcomeSlides, 3000); // Change image every 3 seconds
    }

    showWelcomeSlides();
