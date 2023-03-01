# Generation of certificates

## Server Certificates

```bash
openssl req \
	-x509 \
	-newkey rsa:4096 \
	-keyout server/certificates/server_key.pem \
	-out server/certificates/server_cert.pem \
	-nodes \
	-days 365 \
	-subj "/CN=localhost/O=Client\ Certificate\ Demo"
```

This is actually a three-step process combined into one command:

- Create a new 4096bit RSA key and save it to **_server_key.pem_**
- Create a Certificate Signing Request (CSR) for a given subject, valid for 365 days
- Sign the CSR using the server key, and save it to **_server_cert.pem_** as an X.509 certificate

which generates _two_ files:

- `server_cert.pem`
- `server_key.pem`

<br>

## Create Alice's Certificate (server-signed and valid)

We create a certificate for Alice in a three-step process:

- Create a new 4096bit RSA key and save it to **_alice_key.pem_**
- Create a Certificate Signing Request (CSR) for a given subject, valid for 365 days
- Sign the CSR using the server key, and save it to **_alice_cert.pem_** as an X.509 certificate

```bash
# generate server-signed (valid) certificate
openssl req \
	-newkey rsa:4096 \
	-keyout client/certificates/alice_key.pem \
	-out client/certificates/alice_csr.pem \
	-nodes \
	-days 365 \
	-subj "/CN=Alice"

# sign with server_cert.pem
openssl x509 \
	-req \
	-in client/certificates/alice_csr.pem \
	-CA server/certificates/server_cert.pem \
	-CAkey server/certificates/server_key.pem \
	-out client/certificates/alice_cert.pem \
	-set_serial 01 \
	-days 365
```

<br>

## Create Bob's Certificate (self-signed and invalid)

Bob creates own without our server key.
We create a certificate for Alice in a three-step process:

- Create a new 4096bit RSA key and save it to **_bob_key.pem_**
- Create a Certificate Signing Request (CSR) for a given subject, valid for 365 days
- Sign the CSR using it's own key, and save it to **_bob_cert.pem_** as an X.509 certificate

```bash
# generate self-signed (invalid) certificate
openssl req \
	-newkey rsa:4096 \
	-keyout client/certificates/bob_key.pem \
	-out client/certificates/bob_csr.pem \
	-nodes \
	-days 365 \
	-subj "/CN=Bob"

# sign with bob_csr.pem
openssl x509 \
	-req \
	-in client/certificates/bob_csr.pem \
	-signkey client/certificates/bob_key.pem \
	-out client/certificates/bob_cert.pem \
	-days 365
```
