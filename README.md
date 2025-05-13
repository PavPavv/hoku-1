# HOKU-1

This is a small study native NodeJS server returning HTML templates back to client like it is 2007 of mine! Life been much easier!📼😉

To run it locally with Docker run (Linux Ubuntu 20.04 OS):

## Way 1

1. Build tagged image

```bash
sudo docker build -t hoku-1-image .
```

2. Check container with built Hoku-1 image

```bash
sudo docker ps
```

3. Run Hoku-1 container from its image

```bash
sudo docker run --name hoku-1-container -p 4800:4800 hoku-1-image
```

4. To stop open new terminal and check list of running containers

```bash
sudo docker ps
```

5. Find container id for hoku-1-image and stop it

```bash
sudo docker stop <container-id>
```

5. Check all stopped containers

```bash
sudo docker ps -a
```

6. Kill Hoku-1 container

```bash
sudo docker rm <container-id> -f
```

7. Check images list

```bash
sudo docker images
```

8. Remove Hoku-1 image if necessary

```bash
sudo docker rmi <image-id>
```
