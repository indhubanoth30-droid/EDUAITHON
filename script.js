// script.js - shared for all pages

document.addEventListener('DOMContentLoaded', function () {
  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
    
    // Close menu on window resize if viewport becomes larger
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

  // ===== Click feedback for nav links =====
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', e => {
      a.classList.add('pressed');
      setTimeout(() => a.classList.remove('pressed'), 150);
    });
  });

  // ===== Countdown Timer =====
  if (document.getElementById('days')) {
    startCountdown('Jan 8, 2026 09:00:00');
  }

  // ===== Registration Form Logic =====
  const regForm = document.getElementById('regForm');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const data = {
        teamName: document.getElementById('teamName').value.trim(),
        institution: document.getElementById('institution').value.trim(),
        members: [
          document.getElementById('member1').value.trim(),
          document.getElementById('member2').value.trim(),
          document.getElementById('member3').value.trim(),
          document.getElementById('member4').value.trim()
        ].filter(Boolean),
        mentor: document.getElementById('mentor').value.trim(),
        category: document.getElementById('category').value,
        problem: document.getElementById('problem').value.trim(),
        idea: document.getElementById('idea').value.trim(),
        submittedAt: new Date().toISOString()
      };

      // Simple validation
      if (data.members.length < 3) {
        alert('Please provide at least 3 team members.');
        return;
      }
      if (!data.teamName || !data.institution || !data.mentor || !data.problem || !data.idea) {
        alert('Please fill all required fields.');
        return;
      }

      // In production, replace this with actual server API call
      console.log('Registration data:', data);
      
      // Show success message
      const msg = document.getElementById('successMsg');
      if (msg) {
        msg.classList.remove('hidden');
        msg.scrollIntoView({behavior:'smooth', block:'center'});
      }
      
      regForm.reset();
      
      // Optional: Show a more user-friendly success notification
      showNotification('Registration submitted successfully!', 'success');
    });

    // Clear button
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear the form?')) {
          regForm.reset();
        }
      });
    }
  }

  // ===== FAQ Accordion =====
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const accordionContent = this.nextElementSibling;
      
      // Close other open accordions (optional - remove if you want multiple open)
      document.querySelectorAll('.accordion-item.active').forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('active');
          item.querySelector('.accordion-content').style.maxHeight = null;
        }
      });
      
      // Toggle current accordion
      accordionItem.classList.toggle('active');
      
      if (accordionItem.classList.contains('active')) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      } else {
        accordionContent.style.maxHeight = null;
      }
    });
  });

  // ===== Smooth Scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// ===== Countdown Timer Function =====
function startCountdown(targetDateString) {
  const target = new Date(targetDateString).getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = Date.now();
    const diff = target - now;
    
    if (diff <= 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minsEl.innerText = '00';
      secsEl.innerText = '00';
      clearInterval(timer);
      
      // Optional: Show event started message
      const timerContainer = document.getElementById('timer');
      if (timerContainer) {
        timerContainer.innerHTML = '<h3 class="gradient-text" style="margin: 0;">The Event Has Started!</h3>';
      }
      return;
    }
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = String(d).padStart(2, '0');
    hoursEl.innerText = String(h).padStart(2, '0');
    minsEl.innerText = String(m).padStart(2, '0');
    secsEl.innerText = String(s).padStart(2, '0');
  }

  update();
  const timer = setInterval(update, 1000);
}

// ===== Notification Helper Function =====
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#00b4d8' : '#ff007c'};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add animation styles for notifications
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    // Adds the class to trigger the Sign Up animation
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    // Removes the class to trigger the Sign In animation
    container.classList.remove("right-panel-active");
});