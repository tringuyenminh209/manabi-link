    #!/bin/sh

# Start PHP-FPM
php-fpm -D

# Wait for PHP-FPM to start
sleep 2

# Check if PHP-FPM is running
if pgrep -f "php-fpm" > /dev/null; then
    echo "PHP-FPM started successfully"
else
    echo "Failed to start PHP-FPM"
    exit 1
fi

# Keep container running
tail -f /dev/null 