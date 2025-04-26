pipeline {
    agent any

    environment {
        CLIENT_IMAGE = "client:latest"
        SERVER_IMAGE = "server:latest"
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub')
    }

    stages {

        stage('Checking') {
            steps {
                script {
                    sh 'ls'
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    sh """
                        echo "${DOCKER_HUB_CREDENTIALS_PSW}" | docker login -u "${DOCKER_HUB_CREDENTIALS_USR}" --password-stdin
                    """
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                script {
                    sh """
                        CLIENT_IMAGE=${CLIENT_IMAGE} SERVER_IMAGE=${SERVER_IMAGE} docker-compose up -d --build
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh """
                        docker push ${CLIENT_IMAGE}
                        docker push ${SERVER_IMAGE}
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Completed Successfully'
        }
        failure {
            echo '❌ Build Failed'
        }
    }
}
