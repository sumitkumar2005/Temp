pipeline {
    agent any
    stages {
        stage('Docker Compose Up') {
            steps {
                script {
                    sh '''
                   
                    CLIENT_IMAGE=client SERVER_IMAGE=server docker-compose up -d --build
                    '''
                }
            }
        }
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh '''
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    '''
                }
            }
        }
        stage('Tag Images for Docker Hub') {
            steps {
                script {
                    sh '''
                    # Tag the built images correctly
                    docker tag client:latest sumit589/client:latest
                    docker tag server:latest sumit589/server:latest
                    '''
                }
            }
        }
       
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}
