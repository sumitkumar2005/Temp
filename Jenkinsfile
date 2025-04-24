pipeline {
    agent any

    

    environment {
        CLIENT_IMAGE = "client:${BUILD_NUMBER}"
        SERVER_IMAGE = "server:${BUILD_NUMBER}"
    }

    stages {
       

     stage( 'Checking')
     {
        steps{
            script{
                ls
            }
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
            echo 'Build got  Failed'
        }
        
    }
}
