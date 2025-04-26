pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub'
        CLIENT_IMAGE = "client:${BUILD_NUMBER}"
        SERVER_IMAGE = "server:${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                }
            }
        }

        stage('Tag Images for Docker Hub') {
            steps {
                script {
                    sh "docker tag ${CLIENT_IMAGE} sumit589/${CLIENT_IMAGE}"
                    sh "docker tag ${SERVER_IMAGE} sumit589/${SERVER_IMAGE}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "docker push sumit589/${CLIENT_IMAGE}"
                sh "docker push sumit589/${SERVER_IMAGE}"
            }
        }

        stage('Docker Compose Up') {
            steps {
                script {
                    echo '🔧 Building and starting containers with Docker Compose...'
                    sh """
                        CLIENT_IMAGE=${CLIENT_IMAGE} SERVER_IMAGE=${SERVER_IMAGE} docker-compose up -d --build
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Completed'
        }
        failure {
            echo 'Build got Failed'
        }
        always {
            sh 'docker logout'
        }
    }
}
