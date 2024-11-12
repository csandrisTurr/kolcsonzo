doas podman network create xampp

doas podman run \\
    --name xampp-mariadb \\
    --detach \\
    --env MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=1 \\
    --network xampp \\
    -p 3306:3306 \\
    docker.io/mariadb:10.4

doas podman run \\
    --name xampp-phpmyadmin \\
    --detach \\
    --env PMA_HOST=xampp-mariadb \\
    -p 8080:80 \\
    --network xampp \\
    phpmyadmin
