/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}
		document.querySelectorAll('.read-more-btn').forEach(function(button) {
			button.addEventListener('click', function() {
			  var details = button.nextElementSibling;
			  if (details.classList.contains('hidden')) {
				details.classList.remove('hidden');
			  } else {
				details.classList.add('hidden');
			  }
			});
		  });
		  
		  
})(jQuery);
// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyAr7CIPfx4JLa8PeL823ZuHU5NEIv07-R0",
    authDomain: "thumbsup-1c73e.firebaseapp.com",
    projectId: "thumbsup-1c73e",
    storageBucket: "thumbsup-1c73e.appspot.com",
    messagingSenderId: "706794364991",
    appId: "1:706794364991:web:c06c9251b11a99ab71d88a",
    measurementId: "G-0VLXHQXY1P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function incrementCounter(element) {
    var firebaseRef = firebase.database().ref('likes');

    let articleId = element.getAttribute('data-id');

    var articleRef = firebaseRef.child(articleId);

    // Increment the count in the database and handle potential errors
    articleRef.transaction(function(currentCount) {
        return (currentCount || 0) + 1;
    }, function(error, committed, snapshot) {
        if (error) {
            console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
            console.log('Transaction aborted (because of another concurrent transaction).');
        } else {
            console.log('Like count updated!');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var firebaseRef = firebase.database().ref('likes');
	firebaseRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        let articleId = childSnapshot.key;
        let count = childSnapshot.val();
        
        console.log(`Updating counter for: ${articleId} with value: ${count}`);
        
        let counterElement = document.querySelector(`.counter[data-id="${articleId}"]`);
        if (counterElement) {
            counterElement.innerText = count;
        } else {
            console.warn(`No counter element found for ${articleId}`);
        }
    });
});


});

// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyBgQLNMDVaaVKy6NhocXpU3ysqts8b-URg", // Add your API key here
    authDomain: "recruiters-be8ab.firebaseapp.com",
    projectId: "recruiters-be8ab",
    storageBucket: "recruiters-be8ab.appspot.com",
    messagingSenderId: "880574555307",
    appId: "1:880574555307:web:7740932c3c84c649c483ee",
    measurementId: "G-M7P3MKK8SR"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

// Function to toggle chat display
function toggleChat() {
    const chatbot = document.querySelector('.chatbot-body');
    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
        chatbot.style.display = 'block';
    } else {
        chatbot.style.display = 'none';
    }
}

// Function to show recruiter fields
function showRecruiterFields() {
    document.getElementById('recruiterQuestion').style.display = 'none';
    document.getElementById('recruiterFields').style.display = 'block';
}

// Function to show non-recruiter fields
function showNonRecruiterFields() {
    document.getElementById('recruiterQuestion').style.display = 'none';
    document.getElementById('nonRecruiterFields').style.display = 'block';
}

// Function to submit recruiter feedback
function submitRecruiterFeedback() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const feedback = document.getElementById('feedback').value;

    // Assuming you'll implement a function to save this data to your NoSQL database
    saveToDatabase(name, email, company, feedback);

    showThankYouModal();
}

// Example function to save data to your database


function saveToDatabase(name, email, company, feedback) {
    // Reference to your 'feedbacks' path in Firebase
    const feedbackRef = db.ref('feedbacks');
    
    // Generate the current formatted date and time
    const timestamp = getCurrentFormattedDate();

    // Push the new feedback to the database
    feedbackRef.push({ name, email, company, feedback, timestamp }, function(error) {
        if (error) {
            console.error('Error saving feedback:', error);
        } else {
            console.log('Feedback saved successfully!');
        }
    });
}


// Function to show the thank you modal
function showThankYouModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// For the non-recruiters, we just console.log the data.
// However, you could easily adjust this function to save the non-recruiter data as well.
function submitNonRecruiterFeedback() {
    const name = document.getElementById('nameNonRecruiter').value;
    const feedback = document.getElementById('feedbackNonRecruiter').value;
    
    console.log('Non-Recruiter Feedback:', { name, feedback });
    showThankYouModal();
}
function getCurrentFormattedDate() {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
}




