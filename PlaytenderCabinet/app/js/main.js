document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup-btn")) {
      document.querySelectorAll('.popup-container').forEach(function (popup) {
        popup.classList.remove('active');
      });
      const popupTarget = document.querySelector(event.target.getAttribute('popup-target'));
      if (popupTarget) {
        popupTarget.classList.add('active');
      }
    }

    if (event.target.classList.contains("popup-close")) {
      const closestPopup = event.target.closest('.popup-container');
      if (closestPopup) {
        closestPopup.classList.remove('active');
      }
    }
  });

  const notifyMail = document.querySelector('#change-mail-popup .main-btn');
  if (notifyMail) {
    notifyMail.addEventListener('click', function() {
      const notification = document.createElement('div');
      notification.classList.add('notification', 'success');
      
      notification.innerHTML = `
          <div class="heading">Ваш email змінено успішно</div>
          <div class="descr">Лист з підтвердженням надісланий на вашу нову адресу електронної пошти iov.mail.zt@gmail.com</div>
          <div class="progress-bar"></div>
          <button class="close-btn"></button>
      `;
      
      const container = document.querySelector('body');
      container.appendChild(notification);

      const progressBar = notification.querySelector('.progress-bar');
      progressBar.style.transitionDuration = '6s';
      setTimeout(() => {
          progressBar.style.width = '100%';
      }, 100);

      setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 500);
      }, 6000);
      
      notification.querySelector('.notification .close-btn').addEventListener('click', () => {
          notification.remove();
      });
    });
  }

  const passwordToggler = document.querySelectorAll('.password-toggler');
  passwordToggler.forEach(function(toggler) {
    toggler.addEventListener('click', function() {
      const passwordGroup = this.closest('.show-password-group');
      const passwordInput = passwordGroup.querySelector('input');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordGroup.classList.add('active');
      } else {
        passwordInput.type = 'password';
        passwordGroup.classList.remove('active');
      }
    });
  });

  const notifyPassword = document.querySelector('#change-password-popup .main-btn');
  if (notifyPassword) {
    notifyPassword.addEventListener('click', function() {
      const notification = document.createElement('div');
      notification.classList.add('notification', 'success');
      notification.classList.add('progress', 'success');
      
      notification.innerHTML = `
          <div class="heading">Пароль успішно змінено</div>
          <div class="progress-circle">
              <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle class="background" cx="8" cy="8" r="7" style="stroke: #474A51;" />
                  <circle class="progress" cx="8" cy="8" r="7" style="stroke: #FCFCFC;" />
              </svg>
          </div>
      `;
      
      const container = document.querySelector('body');
      container.appendChild(notification);

      const progressCircle = notification.querySelector('.progress');
      const totalLength = progressCircle.getTotalLength();
      
      progressCircle.style.strokeDasharray = totalLength;
      progressCircle.style.strokeDashoffset = totalLength;

      let currentOffset = totalLength;
      const duration = 5000;
      const intervalTime = 50;
      const steps = duration / intervalTime;
      const step = totalLength / steps;

      const interval = setInterval(() => {
          currentOffset -= step;
          if (currentOffset <= 0) {
              currentOffset = 0;
              clearInterval(interval);
          }
          progressCircle.style.strokeDashoffset = currentOffset;
      }, intervalTime);

      setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 500);
      }, 5000);
    });
  }

  const notificationsPopup = document.querySelector('.notifications-popup');
  if(notificationsPopup){
    document.querySelector('.header_menu_toggler').addEventListener('click', function() {
      notificationsPopup.classList.toggle("active");
      this.classList.toggle("active");
    });

    document.querySelector('.notifications-popup_top .main-btn').addEventListener('click', function() {
      document.querySelectorAll('.notifications-message').forEach(b => b.classList.remove('new'));
      this.remove();
    });

    document.querySelectorAll('.notifications-nav-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.notifications-nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const target = this.getAttribute('data-target');
        const messages = document.querySelectorAll('.notifications-message');
    
        messages.forEach(message => {
          const messageTarget = message.getAttribute('data-target');
          if (target === 'all' || target === messageTarget) {
            message.style.display = '';
          } else {
            message.style.display = 'none';
          }
        });
      });
    });
  }

  const profilePopup = document.querySelector('.profile-popup');
  if(profilePopup){
    document.querySelector('.profile-toggler').addEventListener('click', function() {
      profilePopup.classList.toggle("active");
      document.querySelector('.sidebar_profile').classList.toggle("active");
    });

    document.querySelector('.theme-toggler').addEventListener('click', function() {
      document.querySelector('.theme-popup').classList.add("active");
      document.querySelector('.sidebar_profile').classList.add("active");
      profilePopup.classList.remove("active");
    });
  }
});
