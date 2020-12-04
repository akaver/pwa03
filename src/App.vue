<template>
    <header>
        <nav
            class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
        >
            <div class="container">
                <router-link class="navbar-brand" to="/">Home</router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse"
                >
                    <ul class="navbar-nav flex-grow-1">
                        |

                        <li class="nav-item">
                            <router-link class="nav-link text-dark" to="/"
                                >Home</router-link
                            >
                        </li>

                        <li class="nav-item">
                            <router-link class="nav-link text-dark" to="/about"
                                >About</router-link
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <div class="container">
        <main role="main" class="pb-3">
            <router-view />
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">&copy; 2020 - akaver</div>
    </footer>
</template>

<style>
/* Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
for details on configuring this project to bundle and minify static web assets. */

a.navbar-brand {
    white-space: normal;
    text-align: center;
    word-break: break-all;
}

/* Provide sufficient contrast against white background */
a {
    color: #0366d6;
}

.btn-primary {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
    font-size: 14px;
}
@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

.border-top {
    border-top: 1px solid #e5e5e5;
}
.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

button.accept-policy {
    font-size: 1rem;
    line-height: inherit;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
    position: relative;
    min-height: 100%;
}

body {
    /* Margin bottom by footer height */
    margin-bottom: 60px;
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    white-space: nowrap;
    line-height: 60px; /* Vertically center the text there */
}
</style>
