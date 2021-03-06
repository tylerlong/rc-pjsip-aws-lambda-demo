FROM ubuntu
LABEL maintainer="Tyler Liu (tyler.liu@ringcentral.com)"
RUN apt-get update && apt-get install -y wget build-essential pkg-config
RUN wget https://github.com/pjsip/pjproject/archive/2.10.tar.gz && tar -zxvf 2.10.tar.gz
WORKDIR /pjproject-2.10/
RUN ./configure && make dep && make && make install
COPY ./src/* /src/
WORKDIR /src/
CMD /src/run.sh
