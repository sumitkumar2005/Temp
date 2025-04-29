pipeline {
    agent any

    stages {
        stage('Clean Previous Containers') {
            steps {
                script {
                    sh '''
                    echo "Stopping and removing old containers if any..."
                    docker-compose -f docker-compose.yml down
                    '''
                }
            }
        }

        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    sh '''
                    echo "Building and starting Docker Compose services..."
                    docker-compose -f docker-compose.yml up -d --build
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker session...'
            sh 'docker logout'
        }
    }
}
