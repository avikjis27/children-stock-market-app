minikube-build:
	eval $$(minikube docker-env) && \
	docker build -f ./back-end/Dockerfile ./back-end -t today && \
	docker build -f ./back-end/Dockerfile ./back-end -t bitcoin && \
	docker build -f ./middleware/Dockerfile ./middleware -t middleware && \
	docker build -f ./front-end/Dockerfile ./front-end -t front-end
	
deploy:
	kubectl apply -f ./kubernetes/deployment-bitcoin.yaml
	kubectl apply -f ./kubernetes/deployment-today.yaml
	kubectl apply -f ./kubernetes/deployment-front-end.yaml
	kubectl apply -f ./kubernetes/deployment-middleware.yaml
delete:
	kubectl delete deploy bitcoin-deployment front-end-deployment middleware-deployment today-deployment
	kubectl delete svc bitcoin-service front-end-service middleware-service today-service