document.addEventListener('DOMContentLoaded', () => {
    // Get the buttons and the main container
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // When the user clicks the "Sign In" button (on the left green panel)
    signInButton.addEventListener('click', () => {
        // Remove the active class to switch to the default (Sign In) state
        container.classList.remove("right-panel-active");
    });

    // When the user clicks the "Sign Up" button (on the right green panel)
    signUpButton.addEventListener('click', () => {
        // Add the active class to switch to the Sign Up state
        container.classList.add("right-panel-active");
    });
});