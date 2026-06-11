import sys

# Update SecurityConfig.java
path_sec = "Backend/src/main/java/com/utp/tridentist/config/SecurityConfig.java"
with open(path_sec, "r") as f:
    content = f.read()

new_content = content.replace(
    '.requestMatchers("/api/public/**").permitAll()',
    '.requestMatchers("/api/public/**").permitAll()\n                    .requestMatchers("/api/doctors/**").permitAll()'
)

with open(path_sec, "w") as f:
    f.write(new_content)

# Update CorsConfig.java
path_cors = "Backend/src/main/java/com/utp/tridentist/config/CorsConfig.java"
with open(path_cors, "r") as f:
    content = f.read()

new_content = content.replace(
    '.allowedOrigins("http://localhost:3000")',
    '.allowedOrigins("http://localhost:5173", "http://localhost:3000")'
)

with open(path_cors, "w") as f:
    f.write(new_content)

print("Updates applied successfully.")
