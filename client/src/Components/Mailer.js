import React from 'react';
import '../Css/Mailer.css';

function Mailer() {

    return (
        <div class="container">
            <section class="row mt-5 text-center">
                <div class="col-md-6 m-auto">
                    <form action="/signup" method="POST">
                        <div class="form-group">
                            <input
                                type="text"
                                name="firstName"
                                id="first-name"
                                class="form-control"
                                placeholder="First Name"
                            />
                        </div>
                        <div class="form-group">
                            <input
                                type="text"
                                name="lastName"
                                id="last-name"
                                class="form-control"
                                placeholder="Last Name"
                            />
                        </div>
                        <div class="form-group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                class="form-control"
                                placeholder="Email"
                            />
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">
                            Sign Up
            </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Mailer