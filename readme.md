# Prequisits
### [Nirn Proxy](https://github.com/germanoeich/nirn-proxy)
`screen -dmS Discord-Proxy -d -m docker run -e REQUEST_TIMEOUT=15000 -p 8080:8080 -p 9000:9000 ghcr.io/germanoeich/nirn-proxy:v1.3.3`

### [Redis](https://redis.io/)
`screen -dmS Redis -d -m docker run -p 6379:6379 redis`

### [Jemalloc](https://jemalloc.net/)
`apt-get update && apt-get install libjemalloc-dev` <br />
`echo "/usr/lib/x86_64-linux-gnu/libjemalloc.so" >> /etc/ld.so.preload`
