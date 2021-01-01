package com.shreejiShop.demo.security;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtProviderImpl implements IJwtProvider {

	private KeyStore keyStore;

	@Value("${jwt.expiration.time}")
	private Long jwtExpirationInMillis;

	@PostConstruct
	public void init() {
		try {
			keyStore = KeyStore.getInstance("JKS");
			InputStream resourceAsStream = getClass().getResourceAsStream("/springblog.jks");
			keyStore.load(resourceAsStream, "secret".toCharArray());
		} catch (KeyStoreException | NoSuchAlgorithmException | CertificateException | IOException e) {
			System.out.println("Exception occurren while loading keystore");
			e.printStackTrace();
		}
	}

	@Override
	public String generateToken(Authentication authentication) {
		User principal = (User) authentication.getPrincipal();
		return Jwts.builder().setSubject(principal.getUsername()).setIssuedAt(Date.from(Instant.now()))
				.setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis))).signWith(getPrivateKey())
				.compact();
	}
	
	@Override
	public String generateTokenWithUsername(String username) {
		return Jwts.builder().setSubject(username).setIssuedAt(Date.from(Instant.now()))
				.setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis))).signWith(getPrivateKey())
				.compact();
	}
	
	@Override
	public boolean validateToken(String jwt) {
		Jwts.parser().setSigningKey(getPublicKey()).parseClaimsJws(jwt);
		return true;
	}

	@Override
	public String getUsernameFromJwt(String token) {
//		Claims claims = Jwts.parser().setSigningKey(getPublicKey()).parseClaimsJwt(token).getBody();
		Claims claims = Jwts.parser().setSigningKey(getPublicKey()).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	@Override
	public Long getJwtExpirationInMillis() {
		return jwtExpirationInMillis;
	}

	private PrivateKey getPrivateKey() {
		try {
			return (PrivateKey) keyStore.getKey("springblog", "secret".toCharArray());
		} catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
			System.out.println("Exception occurred while retrieving private key from keystore");
			e.printStackTrace();
		}
		return null;
	}

	private PublicKey getPublicKey() {
		try {
			return (PublicKey) keyStore.getCertificate("springblog").getPublicKey();
		} catch (KeyStoreException e) {
			System.out.println("Exception occurred while retrieving private key from keystore");
			e.printStackTrace();
		}
		return null;
	}

}
