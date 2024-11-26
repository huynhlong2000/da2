<template>
    <div class="register-form" v-if="!isAlreadySignIn">
        <h2>Đăng ký tài khoản</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="user">Tên người dùng:</label>
                <input type="text" id="user" v-model="user" />
                <span v-if="!isValidUser" class="error-message"
                    >Tên người dùng không được để trống.</span
                >
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" />
                <span v-if="!isValidEmail" class="error-message"
                    >Email không hợp lệ.</span
                >
            </div>
            <div class="form-group">
                <label for="phone">Số điện thoại:</label>
                <input type="text" id="phone" v-model="phone" />
                <span v-if="!isValidPhone" class="error-message"
                    >Số điện thoại không hợp lệ.</span
                >
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" v-model="password" />
                <span v-if="!isValidPassword" class="error-message"
                    >Mật khẩu phải có ít nhất 6 ký tự.</span
                >
            </div>
            <button
                type="submit"
                :disabled="
                    !isValidUser ||
                    !isValidEmail ||
                    !isValidPhone ||
                    !isValidPassword
                "
            >
                Đăng ký
            </button>
            <div v-if="showSuccessMessage" class="success-message">
                Đăng ký thành công!
            </div>

            <button
                type="button"
                class="login-with-google-btn"
                @click="handleSignInGoogle"
            >
                Sign in with Google
            </button>
        </form>
    </div>
    <div class="info-user" v-else style="text-align: center; margin-top: 10%">
        <img
            :src="userInfo.photoUrl"
            alt=""
            style="width: 160px; border-radius: 50%"
        />
        <h2 style="margin: 24px 0">{{ userInfo.displayName }}</h2>
        <p>{{ userInfo.email }}</p>
    </div>
</template>

<script>
import { signInWithGoogle } from "../common/common.js";
export default {
    data() {
        return {
            user: "",
            email: "",
            phone: "",
            password: "",
            showSuccessMessage: false, // Thêm biến để kiểm soát hiển thị thông báo
            isAlreadySignIn: false,
            userInfo: null,
        };
    },
    computed: {
        isValidUser() {
            return this.user.trim() !== "";
        },
        isValidEmail() {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
        },
        isValidPhone() {
            return /^\d{9}$/.test(this.phone);
        },
        isValidPassword() {
            return this.password.length >= 6;
        },
    },
    methods: {
        async handleSignInGoogle() {
            try {
                this.userInfo = await signInWithGoogle();
                this.isAlreadySignIn = true;
            } catch (error) {
                console.log(error);
            }
        },
        submitForm() {
            if (
                this.isValidUser &&
                this.isValidEmail &&
                this.isValidPhone &&
                this.isValidPassword
            ) {
                // Thực hiện hành động đăng ký tài khoản ở đây
                console.log("Đăng ký thành công!");
                this.showSuccessMessage = true; // Hiển thị thông báo thành công
                // Reset các trường nhập liệu sau khi đăng ký thành công
                this.user = "";
                this.email = "";
                this.phone = "";
                this.password = "";
            } else {
                console.log("Vui lòng điền đúng thông tin.");
            }
        },
    },
};
</script>

<style scoped>
/* LOGIN GOOGLE BUTTON */
.login-with-google-btn {
    transition: background-color 0.3s, box-shadow 0.3s;
    display: block;
    margin-top: 12px;
    width: 100%;
    cursor: pointer;
    padding: 12px 16px 12px 42px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

    color: #757575;
    font-size: 14px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;

    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
    background-color: white;
    background-repeat: no-repeat;
    background-position: 12px 11px;

    &:hover {
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }

    &:active {
        background-color: #eeeeee;
    }

    &:focus {
        outline: none;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
            0 0 0 3px #c8dafc;
    }

    &:disabled {
        filter: grayscale(100%);
        background-color: #ebebeb;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
    }
}
body {
    text-align: center;
    padding-top: 2rem;
}

.register-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.error-message {
    color: red;
    font-size: 0.9em;
}

.success-message {
    color: green;
    font-size: 0.9em;
}
</style>
