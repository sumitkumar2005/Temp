pipeline {
    agent any

    stages {
        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    sh '''
                    echo "Building and starting Docker Compose services..."
                    docker-compose -f docker-compose.yml up --build -d
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker session...'
            sh 'docker logout || true'
        }
    }
}
