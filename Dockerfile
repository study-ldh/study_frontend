# 1단계: 빌드 스테이지
FROM node:24-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 실행 스테이지 (Nginx 사용)
FROM nginx:stable-alpine
# 일반 리액트(CRA)는 결과물이 build 폴더에 생깁니다.
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]