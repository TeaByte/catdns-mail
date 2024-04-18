## Getting Started

Follow these steps to get started with CatDNS Mail:

1. **Clone the repository**

   ```sh
   git clone https://github.com/TeaByte/catdns-mail
   cd catdns-mail
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```
3. Domain configure
   ```sh
   # add MX record to your DNS
   # MX     10    mail.catdns.in
   
   # add A record to your DNS
   # A  0.0.0.0   mail.catdns.in
   ```

4. **Install and configure mail server**

   ```sh
   sudo apt install postfix
   sudo apt install ufw
   sudo ufw allow 25/tcp
   sudo ufw allow 143/tcp
   sudo ufw allow 993/tcp
   sudo ufw reload
   
   sudo nano /etc/postfix/main.cf
   
   # Edit/Add (main.cf):
   # virtual_alias_maps = hash:/etc/postfix/virtual
   # myhostname = mail.catdns.in
   # mydomain = catdns.in
   # myorigin = catdns.in
   # mydestination = $myhostname, catdns.in, localhost.localdomain, localhost
   # smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)
   
   # Create or Edit /etc/postfix/virtual:
   @catdns.in  root
   
   sudo postmap /etc/postfix/virtual
   sudo systemctl restart postfix
   ```

4. **Start the server / mail parser**

   ```sh
   # mailserver
   npm run mailserver
   
   # website
   npm build
   npm start
   ```

