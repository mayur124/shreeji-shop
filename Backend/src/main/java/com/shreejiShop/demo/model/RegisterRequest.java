package com.shreejiShop.demo.model;

public class RegisterRequest {
	private String name;
	private Long pinCode;
	private String address;
	private Long phoneNumber;
	private String email;
	private String userName;
	private String password;

	public RegisterRequest() {
		super();
	}

	public RegisterRequest(String name, Long pinCode, String address, Long phoneNumber, String email, String userName,
			String password) {
		super();
		this.name = name;
		this.pinCode = pinCode;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.userName = userName;
		this.password = password;
	}

	@Override
	public String toString() {
		return "RegisterRequest [name=" + name + ", pinCode=" + pinCode + ", address=" + address + ", phoneNumber="
				+ phoneNumber + ", email=" + email + ", userName=" + userName + ", password=" + password + "]";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getPinCode() {
		return pinCode;
	}

	public void setPinCode(Long pinCode) {
		this.pinCode = pinCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
